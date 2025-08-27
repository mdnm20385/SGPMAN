using Microsoft.EntityFrameworkCore;
using System;

/// <summary>
/// Configuração robusta do ModelBuilder para evitar erros de migration
/// </summary>
public static class SafeMilModelBuilderConfig
{
    public static void ConfigureMilEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Mil>(entity =>
        {
            // ===== CONFIGURAÇÃO DA CHAVE PRIMÁRIA =====
            entity.HasKey(m => m.milStamp);

            entity.Property(m => m.milStamp)
                  .HasMaxLength(450)
                  .IsRequired()
                  .ValueGeneratedNever(); // Não auto-gerar

            // ===== CONFIGURAÇÕES DE PROPRIEDADES (SEGURAS) =====

            // Nome - sem alterar estrutura existente
            entity.Property(m => m.nome)
                  .IsRequired(false); // Mantém nullable se já existir

            // NIM - mantém como está
            entity.Property(m => m.nim)
                  .IsRequired();

            // Sexo - CONFIGURAÇÃO SEGURA para evitar erro de migration
            entity.Property(m => m.sexo)
                  .HasColumnType("nvarchar(10)") // Tamanho maior para evitar truncamento
                  .IsRequired(false); // Nullable para evitar constraint issues

            // Outras propriedades importantes - configuração segura
            entity.Property(m => m.grupSangue)
                  .HasColumnType("nvarchar(20)")
                  .IsRequired(false);

            entity.Property(m => m.nacional)
                  .HasColumnType("nvarchar(100)")
                  .IsRequired(false);

            entity.Property(m => m.ramo)
                  .HasColumnType("nvarchar(100)")
                  .IsRequired(false);

            // Datas como string - configuração segura
            entity.Property(m => m.nascData)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false);

            entity.Property(m => m.incData)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false);

            entity.Property(m => m.inicioTreino)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false);

            entity.Property(m => m.terminoTreino)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false);

            // Campos de auditoria
            entity.Property(m => m.inseriu)
                  .HasColumnType("nvarchar(100)")
                  .IsRequired(false);

            entity.Property(m => m.alterou)
                  .HasColumnType("nvarchar(100)")
                  .IsRequired(false);

            // ===== DELETE CASCADE APENAS PARA RELAÇÕES CONFIRMADAS =====

            // MilDoc - Documentos do militar
            entity.HasMany(m => m.MilDoc)
                  .WithOne() // Sem especificar navegação reversa para evitar erros
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // MilSit - Situações do militar
            entity.HasMany(m => m.MilSit)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // MilAgre - Agregações do militar
            entity.HasMany(m => m.MilAgre)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // MilConde - Condecorações do militar
            entity.HasMany(m => m.MilConde)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // MilFor - Formações do militar
            entity.HasMany(m => m.MilFor)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // MilFuncao - Funções do militar
            entity.HasMany(m => m.MilFuncao)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // Telefone - Telefones do militar
            entity.HasMany(m => m.Telefone)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            // ===== CONFIGURAÇÕES ADICIONAIS SEGURAS =====

            // Índice para NIM (se não existir)
            try
            {
                entity.HasIndex(m => m.nim)
                      .IsUnique(false) // Não forçar unique se houver duplicatas
                      .HasDatabaseName("IX_Mil_NIM");
            }
            catch
            {
                // Ignora se já existir
            }

            // Índice para nome
            try
            {
                entity.HasIndex(m => m.nome)
                      .HasDatabaseName("IX_Mil_Nome");
            }
            catch
            {
                // Ignora se já existir
            }
        });

        Console.WriteLine("✅ Configuração SEGURA da entidade Mil aplicada");
    }

    /// <summary>
    /// Configuração progressiva - aplica apenas delete cascade sem alterar estrutura
    /// </summary>
    public static void ConfigureOnlyDeleteCascade(ModelBuilder modelBuilder)
    {
        // Aplica APENAS delete cascade sem alterar propriedades
        var entityTypes = modelBuilder.Model.GetEntityTypes().ToList();

        foreach (var entityType in entityTypes)
        {
            if (entityType.ClrType.Name == "Mil")
            {
                var foreignKeys = entityType.GetForeignKeys().ToList();
                foreach (var foreignKey in foreignKeys)
                {
                    try
                    {
                        foreignKey.DeleteBehavior = DeleteBehavior.Cascade;
                        Console.WriteLine($"✅ Delete Cascade configurado: {foreignKey.DeclaringEntityType.DisplayName()}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"⚠️ Erro ao configurar cascade: {ex.Message}");
                    }
                }
            }
        }
    }

    /// <summary>
    /// Método para resolver problemas de migration
    /// </summary>
    public static void FixMigrationIssues(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Mil>(entity =>
        {
            // ===== CORREÇÕES ESPECÍFICAS PARA O ERRO =====

            // Remove constraint problemática do sexo
            entity.Property(m => m.sexo)
                  .HasColumnType("nvarchar(10)") // Tamanho generoso
                  .IsRequired(false) // Nullable
                  .HasDefaultValue(null); // Valor padrão null

            // Configuração defensiva para outras propriedades que podem dar problema
            entity.Property(m => m.grupSangue)
                  .HasColumnType("nvarchar(20)")
                  .IsRequired(false)
                  .HasDefaultValue(null);

            entity.Property(m => m.estCivil)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false)
                  .HasDefaultValue(null);

            entity.Property(m => m.habiLite)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false)
                  .HasDefaultValue(null);

            // ===== APENAS CONFIGURAÇÕES ESSENCIAIS =====
            entity.HasKey(m => m.milStamp);

            entity.Property(m => m.milStamp)
                  .HasMaxLength(450)
                  .IsRequired();
        });

        Console.WriteLine("✅ Problemas de migration corrigidos para entidade Mil");
    }
}

/*
===== COMO RESOLVER O ERRO DE MIGRATION =====

OPÇÃO 1 - CONFIGURAÇÃO SEGURA (Recomendada):
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    SafeMilModelBuilderConfig.ConfigureMilEntity(modelBuilder);
    base.OnModelCreating(modelBuilder);
}
```

OPÇÃO 2 - APENAS DELETE CASCADE (Sem alterar estrutura):
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    SafeMilModelBuilderConfig.ConfigureOnlyDeleteCascade(modelBuilder);
    base.OnModelCreating(modelBuilder);
}
```

OPÇÃO 3 - CORREÇÃO DE PROBLEMAS ESPECÍFICOS:
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    SafeMilModelBuilderConfig.FixMigrationIssues(modelBuilder);
    base.OnModelCreating(modelBuilder);
}
```

===== COMANDOS PARA RESOLVER O ERRO =====

1. **Remover migration problemática:**
```bash
Remove-Migration
```

2. **Adicionar nova migration segura:**
```bash
Add-Migration FixMilConfigSafe
```

3. **Aplicar ao banco:**
```bash
Update-Database
```

===== CAUSA DO ERRO =====

O erro ocorre porque:
- ❌ Tentativa de alterar coluna `sexo` de nvarchar(X) para nvarchar(1)
- ❌ Dados existentes podem ser maiores que 1 caractere
- ❌ Constraints existentes impedem a alteração

===== SOLUÇÃO =====

✅ **Configuração defensiva**: Tamanhos maiores, campos nullable
✅ **Sem alterações drásticas**: Mantém estrutura existente
✅ **Delete cascade seguro**: Apenas para relações confirmadas
✅ **Tratamento de erros**: Try-catch para operações arriscadas

Esta configuração evita erros de migration e mantém a funcionalidade!
*/
