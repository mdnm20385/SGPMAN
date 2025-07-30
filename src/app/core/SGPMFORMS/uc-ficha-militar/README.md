# UC Ficha Militar Component

## Descrição
O componente `UcFichaMilitarComponent` é uma implementação completa de um formulário para gestão de fichas militares, baseado no padrão do componente `FrmFtComponent`. Este componente implementa todas as funcionalidades necessárias para gerenciar informações militares detalhadas.

## Características Principais

### 1. **Interface Baseada na Model Mil**
- Implementa todos os campos da interface `Mil` do sistema SGPM
- Suporte a todos os arrays e objetos relacionados
- Validação completa de dados

### 2. **Estrutura de Abas Organizada**
O componente está organizado em **15 abas principais**:

1. **Dados Pessoais** - Informações básicas do militar
2. **Local de Nascimento** - Dados geográficos de nascimento
3. **Residência** - Informações de morada atual
4. **Incorporação** - Dados de incorporação militar
5. **Treino** - Informações de treino militar
6. **Dados Médicos** - Medidas antropométricas
7. **Dados Salariais** - Configurações de salário
8. **Agregados Familiares** - Familiares do militar
9. **Condecorações** - Galardões e medalhas
10. **Documentos** - Documentos de identificação
11. **Emails** - Endereços eletrônicos
12. **Telefones** - Contatos telefónicos
13. **Formação** - Formação académica
14. **Línguas** - Conhecimentos linguísticos
15. **Situações** - Situações militares

### 3. **Funcionalidades CRUD Completas**
- **Create**: Adicionar novos registos em todas as tabelas
- **Read**: Visualizar informações em modo de leitura
- **Update**: Editar registos existentes
- **Delete**: Remover registos das tabelas

### 4. **Estados do Formulário**
- **Cancel**: Modo de visualização (formulário desabilitado)
- **Insert**: Modo de inserção (novo registo)
- **Update**: Modo de edição (registo existente)

### 5. **Arrays Dinâmicos**
Cada array da interface Mil é implementado com:
- Tabela dinâmica com colunas configuráveis
- Botões para adicionar/remover registos
- Formulários inline para edição
- Validação de dados específicos
- Seleção de linhas

## Componentes e Dependências

### Imports Angular Material
```typescript
- MatFormFieldModule
- MatInputModule
- MatTabsModule
- MatButtonModule
- MatCardModule
- MatCheckboxModule
- MatDatepickerModule
- MatSelectModule
- MatTableModule
- MatDividerModule
- MatAutocompleteModule
- MatIcon
```

### Serviços Utilizados
- `FormBuilder` - Construção de formulários reativos
- `MatDialog` - Diálogos modais
- `ChangeDetectorRef` - Detecção de mudanças
- `NgZone` - Controle de zona Angular
- `ElementRef` e `Renderer2` - Manipulação DOM

## Estrutura de Dados

### FormGroups Principais
1. **Dados Básicos**: Informações pessoais e militares fundamentais
2. **milMed**: Dados médicos/antropométricos
3. **milSalario**: Configurações salariais
4. **milFa**: Dados de falecimento (quando aplicável)
5. **milIDigital**: Impressões digitais

### FormArrays Dinâmicos
- `milAgre[]` - Agregados familiares
- `milConde[]` - Condecorações
- `milDoc[]` - Documentos
- `milEmail[]` - Emails
- `milFor[]` - Formação
- `milLingua[]` - Línguas
- `milSit[]` - Situações
- E muitos outros...

## Validações Implementadas

### Validações Obrigatórias
- **NIM**: Número de Identificação Militar (obrigatório, > 0)
- **Nome**: Nome completo (obrigatório, mínimo 3 caracteres)
- **Email**: Formato válido de email
- **Campos específicos**: Cada array tem seus próprios campos obrigatórios

### Validações Customizadas
- `validarNIM()` - Valida se NIM é válido
- `validarNome()` - Valida nome completo
- `validarFormulario()` - Validação geral do formulário

## Métodos Principais

### Gestão de Estado
- `setFormState()` - Define o estado do formulário
- `canPerformActions()` - Verifica se ações são permitidas
- `getFormStateLabel()` - Retorna label do estado atual

### Operações CRUD
- `onNew()` - Novo registo
- `onEdit()` - Editar registo
- `onCancel()` - Cancelar operação
- `onSave()` - Salvar dados

### Gestão de Arrays
- `addToFormArray()` - Adicionar item a array
- `removeFromFormArray()` - Remover item de array
- `selectRow()` - Selecionar linha de tabela

### Métodos Específicos por Entidade
Para cada tipo de entidade (Agregados, Condecorações, etc.):
- `adicionar[Entidade]()` - Adicionar novo registo
- `remover[Entidade]()` - Remover registo
- `select[Entidade]()` - Selecionar registo

## Estilos e Layout

### Design Responsivo
- Layout adaptativo para diferentes tamanhos de ecrã
- Formulário em grid responsivo
- Tabelas com scroll horizontal
- Botões otimizados para mobile

### Temas e Cores
- Header com gradiente azul
- Indicadores de estado coloridos
- Botões temáticos por ação
- Tabelas com hover e seleção visual

### Classes CSS Principais
- `.ficha-militar-container` - Container principal
- `.form-header` - Cabeçalho do formulário
- `.action-buttons` - Área de botões de ação
- `.custom-tab-group` - Grupo de abas personalizado
- `.data-table` - Tabelas de dados

## Funcionalidades Adicionais

### Pesquisa
- `onSearchClick()` - Pesquisa básica
- `onSearchGenericClick()` - Pesquisa genérica avançada

### Import/Export
- `exportarFichaMilitar()` - Exportar dados
- `importarFichaMilitar()` - Importar dados

### Impressão
- `imprimirFicha()` - Imprimir ficha militar

## Utilização

### Exemplo de Implementação
```typescript
// No módulo ou componente pai
import { UcFichaMilitarComponent } from './uc-ficha-militar.component';

// No template
<app-uc-ficha-militar></app-uc-ficha-militar>
```

### Configuração de Rota
```typescript
{
  path: 'ficha-militar',
  component: UcFichaMilitarComponent
}
```

## Personalização

### Adicionar Novos Campos
1. Adicionar campo ao `generateFormGroup()`
2. Incluir no template HTML
3. Adicionar validação se necessário

### Adicionar Nova Aba
1. Criar FormArray no formulário
2. Implementar métodos CRUD específicos
3. Adicionar aba no template
4. Definir colunas da tabela

### Customizar Validações
1. Criar método de validação
2. Chamar no `validarFormulario()`

## Funcionalidades de Procura

### Botões de Procura nos Campos Principais

Os campos **NIM** e **Nome** agora possuem botões de procura idênticos aos do `FrmFtComponent`:

#### Botão Prefix (ícone: more_vert)
- **Funcionalidade**: Procura direta em registros militares
- **Método**: `getMilitar(campo: string)`
- **Habilitado**: Apenas quando `canPerformActions()` retorna `true`
- **Cor**: Azul (#1976d2) - indica procura por militar

#### Botão Suffix (ícone: search)  
- **Funcionalidade**: Procura geral na base de dados militar
- **Método**: `onMilitarSearchClick(campo: string)`
- **Habilitado**: Apenas quando `formState === 'cancel'`
- **Cor**: Laranja (#ff9800) - indica procura de documentos

### Comportamento dos Botões

1. **Campo NIM**:
   - Prefix: `getMilitar('nim,nome,milstamp')` - procura por NIM, mostra nome
   - Suffix: `onMilitarSearchClick('nim,nome,milstamp')` - procura geral por NIM

2. **Campo Nome**:
   - Prefix: `getMilitar('nome,nim,milstamp')` - procura por nome, mostra NIM  
   - Suffix: `onMilitarSearchClick('nome,nim,milstamp')` - procura geral por nome

### Carregamento Automático

Quando um militar é selecionado através da procura:
- Todos os campos básicos são preenchidos automaticamente
- Arrays relacionados (cartões, cursos, etc.) são carregados
- Notificação de sucesso é exibida
- Formulário é atualizado com `ChangeDetectorRef`

### Tratamento de Erros

- Validação de dados antes do carregamento
- Mensagens de erro específicas com SweetAlert2
- Fallback para erros de comunicação com API
- Log detalhado no console para debugging
3. Adicionar feedback visual no template

## Considerações de Performance

- Utiliza `OnPush` change detection strategy (implementado)
- NgZone protection para operações críticas
- setTimeout para evitar assertion errors em desenvolvimento
- Lazy loading das abas
- Paginação para arrays grandes (recomendado implementar)
- Debounce em campos de pesquisa

### Resolução do Erro "ASSERTION ERROR: Should be run in update mode"

Este componente implementa várias estratégias para resolver o erro comum em desenvolvimento:

1. **setTimeout para operações críticas**: Todas as operações que modificam FormArrays são envolvidas em setTimeout(0) para executar no próximo tick
2. **NgZone protection**: Operações críticas executam dentro de NgZone.run()
3. **Getters seguros**: FormArray getters incluem verificações de null/undefined
4. **Inicialização deferida**: Constructor e ngAfterViewInit usam setTimeout para evitar conflitos
5. **Error handling**: Try-catch blocks em operações críticas com console.warn para debugging

### Debugging

Se ainda ocorrer o erro, verificar:
- Console do navegador para warnings específicos
- Ordem de inicialização dos componentes
- Conflitos com outros componentes que usam FormArrays
- Hot reload do ng serve (tentar ng build para verificar se é específico do desenvolvimento)

## Manutenção

### Atualizações da Interface Mil
1. Verificar mudanças na interface `Models.ts`
2. Atualizar `generateFormGroup()` conforme necessário
3. Ajustar templates e validações
4. Testar funcionalidades afetadas

### Adicionar Novos Tipos de Dados
1. Definir FormGroup para o novo tipo
2. Implementar métodos CRUD
3. Criar componentes de UI necessários
4. Adicionar validações específicas

## Conclusão

Este componente oferece uma solução completa para gestão de fichas militares, implementando todas as funcionalidades do padrão FrmFt adaptadas para o contexto militar. A estrutura modular e extensível permite fácil manutenção e adição de novas funcionalidades conforme necessário.
