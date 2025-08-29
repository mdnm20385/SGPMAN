using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

public static class EntitySaveHelperSimple
{
    public static async Task SaveEntityWithChildrenAsync<T>(DbContext dbContext, T entity, object parentKey = null) where T : class
    {
        try
        {
            // Obtém o tipo de entidade do EF Core
            var entityType = dbContext.Model.FindEntityType(typeof(T));
            if (entityType == null)
                throw new Exception($"Tipo de entidade '{typeof(T).Name}' não encontrado no contexto!");

            // Obtém o nome da propriedade da chave primária
            var pkProperty = entityType.FindPrimaryKey()?.Properties.FirstOrDefault();
            if (pkProperty == null)
                throw new Exception($"Chave primária não encontrada para '{typeof(T).Name}'!");

            var keyProp = typeof(T).GetProperty(pkProperty.Name, BindingFlags.Public | BindingFlags.Instance);
            if (keyProp == null)
                throw new Exception($"Propriedade da chave primária '{pkProperty.Name}' não encontrada!");

            var keyValue = keyProp.GetValue(entity);

            // Se PK for string e não estiver preenchida, gera um novo valor
            if (keyValue != null && (keyProp.PropertyType == typeof(string) && (keyValue == null ||
                    string.IsNullOrWhiteSpace(keyValue as string)) || keyValue.ToString()!.Equals("0")))
            {
                keyProp.SetValue(entity, Pbl.Stamp());
                keyValue = keyProp.GetValue(entity);
            }
            else if (keyValue == null)
            {
                throw new Exception($"Chave primária não preenchida para '{typeof(T).Name}'!");
            }

            // Inicializa propriedades não anuláveis
            foreach (var prop in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (!prop.CanWrite) continue;
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

            // Preenche chaves estrangeiras se necessário
            if (parentKey != null)
            {
                foreach (var prop in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
                {
                    var fkAttr = prop.GetCustomAttribute<ForeignKeyAttribute>();
                    if (fkAttr != null)
                    {
                        var fkValue = prop.GetValue(entity);
                        if (prop.Name.ToLower().Equals("milDocStamp".ToLower()))
                        {
                            // Lógica específica para milDocStamp se necessário
                        }
                        // Só atualiza se estiver vazio ou nulo
                        if (fkValue == null ||
                            (prop.PropertyType == typeof(string) && string.IsNullOrWhiteSpace(fkValue as string)) ||
                            (prop.PropertyType.IsValueType && fkValue.Equals(Activator.CreateInstance(prop.PropertyType))))
                        {
                            prop.SetValue(entity, parentKey);
                        }
                    }
                }
            }

            // **CORREÇÃO**: Limpa o contexto para evitar rastreamento conflitante
            dbContext.ChangeTracker.Clear();

            // Verifica existência da entidade pai PRIMEIRO
            var dbSet = dbContext.Set<T>();
            var found = await dbSet.FindAsync(keyValue);
            bool parentExists = found != null;

            // **CORREÇÃO**: Processa as entidades filhas considerando a existência do pai
            await ProcessChildrenWithParentContext(dbContext, entity, keyValue, parentExists);

            // Agora processa a entidade pai
            if (parentExists)
            {
                // Atualiza a entidade existente
                dbContext.Entry(found).CurrentValues.SetValues(entity);
                dbContext.Entry(found).State = EntityState.Modified;
            }
            else
            {
                // Adiciona nova entidade
                dbContext.Entry(entity).State = EntityState.Added;
            }

            // Salva todas as mudanças de uma vez
            await dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception($"Erro ao salvar entidade '{typeof(T).Name}': {ex.Message}", ex);
        }
    }

    private static async Task ProcessChildrenWithParentContext<T>(DbContext dbContext, T entity, object parentKey, bool parentExists) where T : class
    {
        var entityType = typeof(T);
        var collectionProperties = entityType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType.IsGenericType &&
                       (p.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>) ||
                        p.PropertyType.GetGenericTypeDefinition() == typeof(List<>)))
            .ToList();

        foreach (var collectionProp in collectionProperties)
        {
            var collection = collectionProp.GetValue(entity);
            if (collection == null) continue;

            var childType = collectionProp.PropertyType.GetGenericArguments()[0];
            var childEntityType = dbContext.Model.FindEntityType(childType);
            if (childEntityType == null) continue;

            // Obtém a chave primária da entidade filha
            var childPkProperty = childEntityType.FindPrimaryKey()?.Properties.FirstOrDefault();
            if (childPkProperty == null) continue;

            var childKeyProp = childType.GetProperty(childPkProperty.Name, BindingFlags.Public | BindingFlags.Instance);
            if (childKeyProp == null) continue;

            var childDbSet = dbContext.Set(childType);

            // **CORREÇÃO PRINCIPAL**: Se o pai já existe, remove todas as entidades filhas existentes primeiro
            if (parentExists)
            {
                // Encontra todas as entidades filhas existentes relacionadas ao pai
                var existingChildren = await GetExistingChildrenAsync(dbContext, childType, parentKey);
                if (existingChildren.Any())
                {
                    childDbSet.RemoveRange(existingChildren);
                }
            }

            // Agora processa as novas entidades filhas
            foreach (var childEntity in (System.Collections.IEnumerable)collection)
            {
                if (childEntity == null) continue;

                // Gera nova chave primária para cada entidade filha
                if (childKeyProp.PropertyType == typeof(string))
                {
                    childKeyProp.SetValue(childEntity, Pbl.Stamp());
                }

                // Preenche chave estrangeira
                SetForeignKeys(childEntity, childType, parentKey);

                // Inicializa propriedades não anuláveis
                InitializeNonNullableProperties(childEntity, childType);

                // Adiciona como nova entidade
                await childDbSet.AddAsync(childEntity);
            }
        }
    }

    private static async Task<List<object>> GetExistingChildrenAsync(DbContext dbContext, Type childType, object parentKey)
    {
        var result = new List<object>();

        // Encontra a propriedade de chave estrangeira
        var foreignKeyProps = childType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.GetCustomAttribute<ForeignKeyAttribute>() != null)
            .ToList();

        if (foreignKeyProps.Any())
        {
            var childDbSet = dbContext.Set(childType);

            // Para cada entidade no DbSet, verifica se a FK corresponde ao parentKey
            foreach (var entity in childDbSet)
            {
                foreach (var fkProp in foreignKeyProps)
                {
                    var fkValue = fkProp.GetValue(entity);
                    if (fkValue != null && fkValue.Equals(parentKey))
                    {
                        result.Add(entity);
                        break;
                    }
                }
            }
        }

        return result;
    }

    private static void SetForeignKeys(object childEntity, Type childType, object parentKey)
    {
        var foreignKeyProps = childType.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.GetCustomAttribute<ForeignKeyAttribute>() != null)
            .ToList();

        foreach (var fkProp in foreignKeyProps)
        {
            fkProp.SetValue(childEntity, parentKey);
        }
    }

    private static void InitializeNonNullableProperties(object entity, Type entityType)
    {
        foreach (var prop in entityType.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            if (!prop.CanWrite) continue;
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
    }
}

// Classe auxiliar para gerar stamps
public static class Pbl
{
    public static string Stamp()
    {
        return Guid.NewGuid().ToString().Replace("-", "").Substring(0, 25);
    }
}
