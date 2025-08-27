using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class SaveWithChildrenController : ControllerBase
{
    private readonly DbContext _dbContext;

    public SaveWithChildrenController(DbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Exemplo de uso do método SaveEntityWithChildrenAsync corrigido
    /// </summary>
    [HttpPost("save-entity")]
    public async Task<IActionResult> SaveEntity<T>([FromBody] T entity) where T : class
    {
        try
        {
            // Usa a versão avançada (recomendada)
            await EntitySaveHelper.SaveEntityWithChildrenAsync(_dbContext, entity);

            return Ok(new { success = true, message = "Entidade salva com sucesso!" });
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    /// <summary>
    /// Exemplo alternativo usando a versão simples
    /// </summary>
    [HttpPost("save-entity-simple")]
    public async Task<IActionResult> SaveEntitySimple<T>([FromBody] T entity) where T : class
    {
        try
        {
            // Usa a versão simples (para casos específicos)
            await EntitySaveHelperSimple.SaveEntityWithChildrenAsync(_dbContext, entity);

            return Ok(new { success = true, message = "Entidade salva com sucesso!" });
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    /// <summary>
    /// Método para salvar uma entidade com relacionamento pai-filho específico
    /// </summary>
    [HttpPost("save-with-parent/{parentKey}")]
    public async Task<IActionResult> SaveWithParent<T>(string parentKey, [FromBody] T entity) where T : class
    {
        try
        {
            await EntitySaveHelper.SaveEntityWithChildrenAsync(_dbContext, entity, parentKey);

            return Ok(new { success = true, message = "Entidade e filhas salvas com sucesso!" });
        }
        catch (System.Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
}

/*
PRINCIPAIS CORREÇÕES IMPLEMENTADAS:

1. **Ordem de Processamento**:
   - As entidades filhas são processadas ANTES da entidade pai
   - Isso evita conflitos de chave primária

2. **Controle de Estado do EF Core**:
   - Uso de dbContext.ChangeTracker.Clear() para limpar o rastreamento
   - Verificação e controle adequado do EntityState

3. **Geração de Chaves Primárias**:
   - Gera novas chaves para entidades filhas sempre que necessário
   - Evita reutilização de chaves que podem causar conflitos

4. **Estratégia Replace**:
   - Na versão simples: remove todas as entidades filhas existentes e adiciona as novas
   - Na versão avançada: atualiza as existentes e adiciona as novas

5. **Transação Atômica**:
   - Todas as operações são feitas em uma única transação
   - Se houver erro, todas as mudanças são revertidas

COMO USAR:

1. Para novos registros:
   await EntitySaveHelper.SaveEntityWithChildrenAsync(dbContext, entity);

2. Para atualização com relacionamento:
   await EntitySaveHelper.SaveEntityWithChildrenAsync(dbContext, entity, parentKey);

3. Para casos simples (replace completo):
   await EntitySaveHelperSimple.SaveEntityWithChildrenAsync(dbContext, entity);

PROBLEMAS RESOLVIDOS:

- Duplicação de chave primária nas entidades filhas
- Conflitos de rastreamento do EF Core
- Ordem inadequada de salvamento (pai antes dos filhos)
- Reutilização inadequada de chaves primárias
- Falta de controle de transação

*/
