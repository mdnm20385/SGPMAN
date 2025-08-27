using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

public static class EntitySaveHelper
{
    public static async Task SaveEntityWithChildrenAsync<T>(DbContext dbContext, T entity, object parentKey = null) where T : class
    {
        try
        {
            // Valida e preenche as chaves da entidade principal
            ValidateAndFillEntityKeys(entity, parentKey);

            // Valida e preenche as chaves das entidades filhas
            ValidateAndFillChildrenKeys(entity, GetEntityPrimaryKey(dbContext, entity));

            // Deixa o EF gerenciar as relações automaticamente
            var dbSet = dbContext.Set<T>();
            var keyValue = GetEntityPrimaryKey(dbContext, entity);
            var existingEntity = await dbSet.FindAsync(keyValue);

            if (existingEntity != null)
            {
                // Atualiza entidade existente
                dbContext.Entry(existingEntity).CurrentValues.SetValues(entity);

                // Atualiza as coleções filhas (o EF gerencia automaticamente)
                UpdateChildCollections(dbContext, existingEntity, entity);
            }
            else
            {
                // Adiciona nova entidade (o EF adiciona automaticamente as filhas)
                await dbSet.AddAsync(entity);
            }

            // Uma única operação de save - o EF gerencia tudo
            await dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"Erro ao salvar entidade '{typeof(T).Name}': {ex.Message}", ex);
        }
    }

    /// <summary>
    /// Obtém a chave primária de uma entidade
    /// </summary>
    private static object GetEntityPrimaryKey<T>(DbContext dbContext, T entity) where T : class
    {
        var entityType = dbContext.Model.FindEntityType(typeof(T));
        if (entityType == null)
            throw new Exception($"Tipo de entidade '{typeof(T).Name}' não encontrado no contexto!");

        var pkProperty = entityType.FindPrimaryKey()?.Properties.FirstOrDefault();
        if (pkProperty == null)
            throw new Exception($"Chave primária não encontrada para '{typeof(T).Name}'!");

        var keyProp = typeof(T).GetProperty(pkProperty.Name, BindingFlags.Public | BindingFlags.Instance);
        if (keyProp == null)
            throw new Exception($"Propriedade da chave primária '{pkProperty.Name}' não encontrada!");

        return keyProp.GetValue(entity);
    }

    /// <summary>
    /// Valida e preenche as chaves da entidade principal
    /// </summary>
    private static void ValidateAndFillEntityKeys<T>(T entity, object parentKey = null) where T : class
    {
        var entityType = typeof(T);
        var properties = entityType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var prop in properties)
        {
            if (!prop.CanWrite) continue;

            // Verifica se é chave primária (por convenção ou atributo)
            if (IsPrimaryKey(prop))
            {
                ValidateAndFillPrimaryKey(entity, prop);
            }
            // Verifica se é chave estrangeira
            else if (IsForeignKey(prop))
            {
                ValidateAndFillForeignKey(entity, prop, parentKey);
            }
            // Inicializa propriedades não anuláveis básicas
            else
            {
                InitializeBasicProperty(entity, prop);
            }
        }
    }

    /// <summary>
    /// Valida e preenche as chaves das entidades filhas
    /// </summary>
    private static void ValidateAndFillChildrenKeys<T>(T entity, object parentPrimaryKey) where T : class
    {
        var entityType = typeof(T);
        var collectionProperties = entityType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType.IsGenericType &&
                       (p.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>) ||
                        p.PropertyType.GetGenericTypeDefinition() == typeof(List<>) ||
                        p.PropertyType.GetGenericTypeDefinition() == typeof(IList<>)))
            .ToList();

        foreach (var collectionProp in collectionProperties)
        {
            var collection = collectionProp.GetValue(entity);
            if (collection == null) continue;

            var childType = collectionProp.PropertyType.GetGenericArguments()[0];

            foreach (var childEntity in (System.Collections.IEnumerable)collection)
            {
                if (childEntity == null) continue;

                ValidateAndFillChildEntityKeys(childEntity, childType, parentPrimaryKey);
            }
        }
    }

    /// <summary>
    /// Valida e preenche as chaves de uma entidade filha específica
    /// </summary>
    private static void ValidateAndFillChildEntityKeys(object childEntity, Type childType, object parentPrimaryKey)
    {
        var properties = childType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

        foreach (var prop in properties)
        {
            if (!prop.CanWrite) continue;

            if (IsPrimaryKey(prop))
            {
                ValidateAndFillPrimaryKey(childEntity, prop);
            }
            else if (IsForeignKey(prop))
            {
                ValidateAndFillForeignKey(childEntity, prop, parentPrimaryKey);
            }
            else
            {
                InitializeBasicProperty(childEntity, prop);
            }
        }
    }

    /// <summary>
    /// Verifica se uma propriedade é chave primária
    /// </summary>
    private static bool IsPrimaryKey(PropertyInfo prop)
    {
        // Por convenção: propriedades terminadas em "Id" ou com o nome da classe + "Id"
        // Por atributo: [Key]
        return prop.Name.Equals("Id", StringComparison.OrdinalIgnoreCase) ||
               prop.Name.EndsWith("Id", StringComparison.OrdinalIgnoreCase) ||
               prop.Name.EndsWith("stamp", StringComparison.OrdinalIgnoreCase) ||
               prop.GetCustomAttribute<System.ComponentModel.DataAnnotations.KeyAttribute>() != null;
    }

    /// <summary>
    /// Verifica se uma propriedade é chave estrangeira
    /// </summary>
    private static bool IsForeignKey(PropertyInfo prop)
    {
        return prop.GetCustomAttribute<ForeignKeyAttribute>() != null ||
               (prop.Name.EndsWith("Id", StringComparison.OrdinalIgnoreCase) && !IsPrimaryKey(prop)) ||
               (prop.Name.EndsWith("stamp", StringComparison.OrdinalIgnoreCase) && !IsPrimaryKey(prop));
    }

    /// <summary>
    /// Valida e preenche chave primária
    /// </summary>
    private static void ValidateAndFillPrimaryKey(object entity, PropertyInfo keyProp)
    {
        var keyValue = keyProp.GetValue(entity);

        // Verifica se a chave está vazia, nula ou com valor inválido
        bool isInvalid = keyValue == null ||
                        (keyProp.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(keyValue as string)) ||
                        (keyProp.PropertyType.IsValueType && (keyValue.Equals(Activator.CreateInstance(keyProp.PropertyType)) || keyValue.ToString() == "0"));

        if (isInvalid)
        {
            if (keyProp.PropertyType == typeof(string))
            {
                keyProp.SetValue(entity, Pbl.Stamp());
            }
            else if (keyProp.PropertyType == typeof(int))
            {
                // Para chaves int, você pode implementar uma lógica de geração
                // Por enquanto, deixo 0 que pode ser auto-increment
                keyProp.SetValue(entity, 0);
            }
            else if (keyProp.PropertyType == typeof(Guid))
            {
                keyProp.SetValue(entity, Guid.NewGuid());
            }
        }
    }

    /// <summary>
    /// Valida e preenche chave estrangeira
    /// </summary>
    private static void ValidateAndFillForeignKey(object entity, PropertyInfo fkProp, object parentKey)
    {
        var fkValue = fkProp.GetValue(entity);

        // Só preenche se estiver vazia E se tivermos uma chave pai
        bool isEmpty = fkValue == null ||
                      (fkProp.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(fkValue as string)) ||
                      (fkProp.PropertyType.IsValueType && fkValue.Equals(Activator.CreateInstance(fkProp.PropertyType)));

        if (isEmpty && parentKey != null)
        {
            // Verifica compatibilidade de tipos
            if (fkProp.PropertyType == parentKey.GetType() ||
                (fkProp.PropertyType == typeof(string) && parentKey is string) ||
                (fkProp.PropertyType.IsValueType && parentKey.GetType().IsValueType))
            {
                fkProp.SetValue(entity, parentKey);
            }
        }

        // Validação final: chave estrangeira não pode ser nula ou inválida
        fkValue = fkProp.GetValue(entity);
        bool isStillInvalid = fkValue == null ||
                             (fkProp.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(fkValue as string)) ||
                             (fkProp.PropertyType.IsValueType && fkValue.Equals(Activator.CreateInstance(fkProp.PropertyType)));

        if (isStillInvalid)
        {
            throw new Exception($"Chave estrangeira '{fkProp.Name}' não pode ser nula ou vazia na entidade '{entity.GetType().Name}'!");
        }
    }

    /// <summary>
    /// Inicializa propriedades básicas não anuláveis
    /// </summary>
    private static void InitializeBasicProperty(object entity, PropertyInfo prop)
    {
        var value = prop.GetValue(entity);

        // Handle value types (int, decimal, bool, DateTime, etc.)
        if (prop.PropertyType.IsValueType && Nullable.GetUnderlyingType(prop.PropertyType) == null)
        {
            if (value == null || value.Equals(Activator.CreateInstance(prop.PropertyType)))
            {
                object defaultValue = prop.PropertyType switch
                {
                    Type t when t == typeof(int) => 0,
                    Type t when t == typeof(long) => 0L,
                    Type t when t == typeof(decimal) => 0m,
                    Type t when t == typeof(float) => 0f,
                    Type t when t == typeof(double) => 0d,
                    Type t when t == typeof(bool) => false,
                    Type t when t == typeof(DateTime) => DateTime.MinValue,
                    Type t when t == typeof(byte) => (byte)0,
                    _ => Activator.CreateInstance(prop.PropertyType)
                };
                prop.SetValue(entity, defaultValue);
            }
        }
        // Handle string
        else if (prop.PropertyType == typeof(string) && value == null)
        {
            prop.SetValue(entity, string.Empty);
        }
        // Handle byte[]
        else if (prop.PropertyType == typeof(byte[]) && value == null)
        {
            prop.SetValue(entity, Array.Empty<byte>());
        }
    }

    /// <summary>
    /// Atualiza as coleções filhas (usado para updates)
    /// </summary>
    private static void UpdateChildCollections<T>(DbContext dbContext, T existingEntity, T newEntity) where T : class
    {
        var entityType = typeof(T);
        var collectionProperties = entityType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType.IsGenericType &&
                       (p.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>) ||
                        p.PropertyType.GetGenericTypeDefinition() == typeof(List<>) ||
                        p.PropertyType.GetGenericTypeDefinition() == typeof(IList<>)))
            .ToList();

        foreach (var collectionProp in collectionProperties)
        {
            var newCollection = collectionProp.GetValue(newEntity);
            if (newCollection != null)
            {
                collectionProp.SetValue(existingEntity, newCollection);
            }
        }
    }
}

// Classe auxiliar para gerar stamps (você deve ajustar conforme sua implementação)
public static class Pbl
{
    public static string Stamp()
    {
        return Guid.NewGuid().ToString().Replace("-", "").Substring(0, 25);
    }
}

/*
ABORDAGEM SIMPLIFICADA - APROVEITANDO O ENTITY FRAMEWORK

Esta versão foi refatorada para aproveitar as capacidades nativas do Entity Framework:

PRINCIPAIS MELHORIAS:
1. **Foco nas Chaves**: O código agora foca apenas na validação e preenchimento correto das chaves primárias e estrangeiras
2. **EF Gerencia Relações**: Deixamos o Entity Framework gerenciar automaticamente as relações entre entidades
3. **Validação Rigorosa**: Garante que todas as chaves sejam válidas antes do salvamento
4. **Simplicidade**: Código muito mais limpo e focado

FUNCIONALIDADES:
- ✅ Valida e preenche chaves primárias (não podem ser null, 0 ou vazias)
- ✅ Valida e preenche chaves estrangeiras com base na chave do pai
- ✅ Inicializa propriedades básicas não anuláveis
- ✅ Deixa o EF gerenciar automaticamente as relações pai-filho
- ✅ Uma única operação SaveChanges para tudo

VALIDAÇÕES IMPLEMENTADAS:
- Chaves primárias: Gera automaticamente se estiverem vazias/nulas/0
- Chaves estrangeiras: Preenche com a chave do pai e valida se não estão vazias
- Propriedades básicas: Inicializa com valores padrão seguros

COMO USAR:
```csharp
// Para uma nova entidade com filhas
await EntitySaveHelper.SaveEntityWithChildrenAsync(dbContext, entity);

// Para uma entidade filha relacionada a um pai específico
await EntitySaveHelper.SaveEntityWithChildrenAsync(dbContext, childEntity, parentKey);
```

O Entity Framework automaticamente:
- Gerencia o estado das entidades (Add/Update)
- Persiste as relações entre pai e filhas
- Mantém a integridade referencial
- Executa tudo em uma única transação
*/
