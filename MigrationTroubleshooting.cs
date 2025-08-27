/*
===== SOLUÇÃO PARA O ERRO DE MIGRATION DA TABELA MIL =====

PROBLEMA:
O erro ocorre ao tentar alterar a coluna 'sexo' de nvarchar(X) para nvarchar(1).
Isso pode acontecer quando há dados existentes maiores que 1 caractere.

SOLUÇÕES EM ORDEM DE PRIORIDADE:
*/

// ===== SOLUÇÃO 1: REMOVER E RECRIAR MIGRATION (RECOMENDADA) =====

/*
1. No Package Manager Console, execute:

Remove-Migration

2. Use a configuração segura no OnModelCreating:

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    SafeMilModelBuilderConfig.ConfigureMilEntity(modelBuilder);
    base.OnModelCreating(modelBuilder);
}

3. Crie nova migration:

Add-Migration SafeMilConfig

4. Aplique ao banco:

Update-Database
*/

// ===== SOLUÇÃO 2: VERIFICAR DADOS ANTES DA MIGRATION =====

/*
Execute no SQL Server para verificar dados problemáticos:

SELECT milStamp, sexo, LEN(sexo) as TamanhoSexo
FROM Mil
WHERE LEN(sexo) > 1;

Se houver dados com mais de 1 caractere, corrija antes:

UPDATE Mil
SET sexo = LEFT(sexo, 1)
WHERE LEN(sexo) > 1;

Ou defina valores padrão:

UPDATE Mil
SET sexo = CASE
    WHEN sexo LIKE 'M%' THEN 'M'
    WHEN sexo LIKE 'F%' THEN 'F'
    ELSE 'M'
END
WHERE LEN(sexo) > 1 OR sexo IS NULL;
*/

// ===== SOLUÇÃO 3: MIGRATION MANUAL PERSONALIZADA =====

/*
Se precisar de migration manual, crie uma nova migration vazia:

Add-Migration FixSexoColumn -IgnoreChanges

Depois edite o arquivo de migration gerado:

public partial class FixSexoColumn : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // Primeiro limpa dados problemáticos
        migrationBuilder.Sql(@"
            UPDATE Mil
            SET sexo = LEFT(sexo, 1)
            WHERE LEN(sexo) > 1;
        ");

        // Remove constraint se existir
        migrationBuilder.Sql(@"
            DECLARE @constraintName sysname;
            SELECT @constraintName = name
            FROM sys.default_constraints
            WHERE parent_object_id = OBJECT_ID('Mil')
            AND parent_column_id = (
                SELECT column_id
                FROM sys.columns
                WHERE object_id = OBJECT_ID('Mil')
                AND name = 'sexo'
            );

            IF @constraintName IS NOT NULL
                EXEC('ALTER TABLE Mil DROP CONSTRAINT ' + @constraintName);
        ");

        // Altera a coluna com segurança
        migrationBuilder.AlterColumn<string>(
            name: "sexo",
            table: "Mil",
            type: "nvarchar(10)", // Tamanho maior para evitar problemas
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(1)",
            oldNullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // Reverter se necessário
        migrationBuilder.AlterColumn<string>(
            name: "sexo",
            table: "Mil",
            type: "nvarchar(1)",
            nullable: true,
            oldClrType: typeof(string),
            oldType: "nvarchar(10)",
            oldNullable: true);
    }
}
*/

// ===== SOLUÇÃO 4: CONFIGURAÇÃO DEFENSIVA NO MODELBUILDER =====

using Microsoft.EntityFrameworkCore;

public static class EmergencyMilConfig
{
    public static void ConfigureMinimal(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Mil>(entity =>
        {
            // Configuração mínima e segura
            entity.HasKey(m => m.milStamp);

            entity.Property(m => m.milStamp)
                  .HasMaxLength(450)
                  .IsRequired();

            // Sexo com tamanho generoso para evitar problemas
            entity.Property(m => m.sexo)
                  .HasColumnType("nvarchar(50)") // Bem maior que o necessário
                  .IsRequired(false);

            // Outras propriedades problemáticas
            entity.Property(m => m.grupSangue)
                  .HasColumnType("nvarchar(50)")
                  .IsRequired(false);

            entity.Property(m => m.nome)
                  .HasColumnType("nvarchar(500)")
                  .IsRequired(false);

            // DELETE CASCADE apenas para as relações principais
            entity.HasMany(m => m.MilDoc)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(m => m.MilSit)
                  .WithOne()
                  .HasForeignKey("milStamp")
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}

/*
===== COMANDOS DE EMERGÊNCIA =====

Se nada funcionar, use esta sequência:

1. Backup do banco:
BACKUP DATABASE [SeuBanco] TO DISK = 'C:\Backup\SeuBanco.bak'

2. Drop todas as migrations:
Remove-Migration (repetir até não haver mais)

3. Recriar migration do zero:
Add-Migration InitialCreate

4. Aplicar:
Update-Database

===== PREVENÇÃO FUTURA =====

✅ Sempre use tamanhos generosos para strings
✅ Marque campos como nullable quando apropriado
✅ Teste migrations em ambiente de desenvolvimento primeiro
✅ Faça backup antes de migrations em produção
✅ Use configurações defensivas no ModelBuilder

===== USO IMEDIATO =====

Para resolver agora, adicione no OnModelCreating:

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    EmergencyMilConfig.ConfigureMinimal(modelBuilder);
    base.OnModelCreating(modelBuilder);
}
*/
