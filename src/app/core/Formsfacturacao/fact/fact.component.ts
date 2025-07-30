import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '@core/authentication/auth.service';
import { Fact } from 'app/classes/Facturacao/Facturacao';
import { FactModalComponent } from '../fact-modal/fact-modal.component';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Proc2Component } from '../proc2/proc2.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fact',
  standalone: true,
  imports: [
   CommonModule, // Adicione o CommonModule aqui
     ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
     MatAutocompleteModule,
  ],
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.scss',
})
export class FactComponent implements OnInit {
  form: FormGroup;
  optionsCcu: { descricao: string }[] = [
    { descricao: 'Centro de Custo 1' },
    { descricao: 'Centro de Custo 2' },
    { descricao: 'Centro de Custo 3' }
  ];
  filteredOptionsCcu!: Observable<{ descricao: string }[]>;
  produtosDataSource: any[] = [];
  tesourariaDataSource: any[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      nomeCliente: ['', Validators.required],
      centroCusto: [''],
      produtos: this.fb.array([]),
      tesouraria: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.filteredOptionsCcu = this.form.get('centroCusto')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): { descricao: string }[] {
    const filterValue = value.toLowerCase();
    return this.optionsCcu.filter(option =>
      option.descricao.toLowerCase().includes(filterValue)
    );
  }

  get produtosFormArray(): FormArray {
    return this.form.get('produtos') as FormArray;
  }

  get tesourariaFormArray(): FormArray {
    return this.form.get('tesouraria') as FormArray;
  }

  addProduto(): void {
    const produtoGroup = this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [1, Validators.required],
      preco: [0, Validators.required]
    });
    this.produtosFormArray.push(produtoGroup);
    this.updateProdutosDataSource();
  }

  removeProduto(index: number): void {
    this.produtosFormArray.removeAt(index);
    this.updateProdutosDataSource();
  }

  updateProdutosDataSource(): void {
    this.produtosDataSource = this.produtosFormArray.controls;
  }

  addTesouraria(): void {
    const tesourariaGroup = this.fb.group({
      titulo: ['', Validators.required],
      valor: [0, Validators.required]
    });
    this.tesourariaFormArray.push(tesourariaGroup);
    this.updateTesourariaDataSource();
  }

  removeTesouraria(index: number): void {
    this.tesourariaFormArray.removeAt(index);
    this.updateTesourariaDataSource();
  }

  updateTesourariaDataSource(): void {
    this.tesourariaDataSource = this.tesourariaFormArray.controls;
  }

  onSave(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      Swal.fire('Sucesso!', 'Dados salvos com sucesso!', 'success');
    } else {
      Swal.fire('Erro!', 'Preencha todos os campos obrigatórios!', 'error');
    }
  }

  onCancel(): void {
    this.form.reset();
    this.produtosFormArray.clear();
    this.tesourariaFormArray.clear();
    this.updateProdutosDataSource();
    this.updateTesourariaDataSource();
  }

  openClienteModal(): void {
    Swal.fire('Modal aberto!', 'Aqui você pode selecionar um cliente.', 'info');
  }

  searchCliente(): void {
    const clienteNome = this.form.get('nomeCliente')?.value;
    if (clienteNome) {
      console.log(`Procurando cliente: ${clienteNome}`);
      Swal.fire('Busca realizada!', `Cliente: ${clienteNome}`, 'info');
    } else {
      Swal.fire('Erro!', 'Nome do cliente está vazio.', 'error');
    }
  }
}
// implements OnInit {
//   facts: Fact[] = []; // Lista de todas as Facts
//   displayedColumns: string[] = ['factstamp', 'numdoc', 'nome', 'subtotal', 'total', 'actions']; // Colunas da tabela

//   constructor(private factService: AuthService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.loadFacts(); // Carrega todas as Facts
//   }

//   // Carrega todas as Facts
//   loadFacts(): void {
//     this.factService.getFactss().subscribe((data: Fact[]) => {
//       this.facts = data;
//     });
//   }

//   // Abre o modal com os detalhes da Fact selecionada
// openFactModal(fact: Fact): void {
//   this.factService.getFactWithChildren(fact.factstamp).
//   subscribe((factWithChildren) => {
//     const dialogRef = this.dialog.open(FactModalComponent, {
//       width: '2000px',
//       data: factWithChildren, // Passa os dados da Fact para o modal
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         console.log('Modal fechado com resultado:', result);
//       }
//     });
//   });
// }

//   // Deleta uma Fact
//   deleteFact(factstamp: string): void {
//     this.factService.deleteFacts(factstamp).subscribe(() => {
//       this.loadFacts(); // Recarrega os dados após deletar
//     });
//   }
// }

// export class FactComponent implements OnInit {
//   factForm!: FormGroup; // Formulário principal
//   facts: Fact[] = []; // Lista de todas as Facts
//   displayedColumns: string[] = ['factstamp', 'numdoc', 'nome', 'subtotal', 'total', 'actions']; // Colunas da tabela

//   //constructor(private fb: FormBuilder, private factService: AuthService) {}
// constructor(private factService: AuthService, private dialog: MatDialog) {}

//   ngOnInit(): void {
//     this.initializeForm(); // Inicializa o formulário
//     this.loadFacts(); // Carrega todas as Facts
//   }

//   // Inicializa o formulário principal
//   initializeForm(): void {
//     this.factForm = this.fb.group({
//       factstamp: ['', Validators.required],
//       numdoc: [0, Validators.required],
//       tdocstamp: ['', Validators.required],
//       sigla: ['', Validators.required],
//       numero: ['', Validators.required],
//       data: ['', Validators.required],
//       dataven: ['', Validators.required],
//       nome: ['', Validators.required],
//       morada: ['', Validators.required],
//       telefone: ['', Validators.required],
//       subtotal: [0, Validators.required],
//       total: [0, Validators.required],
//       factl: this.fb.array([]), // Array para linhas
//       factprest: this.fb.array([]), // Array para prestações
//       factreg: this.fb.array([]), // Array para registros
//       formasp: this.fb.array([]), // Array para formas de pagamento
//     });
//   }

//   // Getters para os arrays
//   get factl(): FormArray {
//     return this.factForm.get('factl') as FormArray;
//   }

//   get factprest(): FormArray {
//     return this.factForm.get('factprest') as FormArray;
//   }

//   get factreg(): FormArray {
//     return this.factForm.get('factreg') as FormArray;
//   }

//   get formasp(): FormArray {
//     return this.factForm.get('formasp') as FormArray;
//   }

//   // Carrega todas as Facts
//   loadFacts(): void {
//     this.factService.getFactss().subscribe((data: Fact[]) => {
//       this.facts = data;
//     });
//   }

//   // Carrega os filhos da Fact selecionada
//   loadFactDetails(fact: Fact): void {
//     this.factForm.patchValue({
//       factstamp: fact.factstamp,
//       numdoc: fact.numdoc,
//       tdocstamp: fact.tdocstamp,
//       sigla: fact.sigla,
//       numero: fact.numero,
//       data: fact.data,
//       dataven: fact.dataven,
//       nome: fact.nome,
//       morada: fact.morada,
//       telefone: fact.telefone,
//       subtotal: fact.subtotal,
//       total: fact.total,
//     });

//     // Atualiza os arrays
//     this.factl.clear();
//     fact.factl?.forEach((line) => {
//       this.factl.push(
//         this.fb.group({
//           factlstamp: [line.factlstamp, Validators.required],
//           descricao: [line.descricao, Validators.required],
//           quant: [line.quant, Validators.required],
//           preco: [line.preco, Validators.required],
//           subtotall: [line.subtotall, Validators.required],
//         })
//       );
//     });

//     this.factprest.clear();
//     fact.factprest?.forEach((prest) => {
//       this.factprest.push(
//         this.fb.group({
//           factpreststamp: [prest.factpreststamp, Validators.required],
//           descricao: [prest.descricao, Validators.required],
//           valor: [prest.valor, Validators.required],
//         })
//       );
//     });

//     this.factreg.clear();
//     fact.factreg?.forEach((reg) => {
//       this.factreg.push(
//         this.fb.group({
//           factregstamp: [reg.factregstamp, Validators.required],
//           descricao: [reg.descricao, Validators.required],
//           valorreg: [reg.valorreg, Validators.required],
//         })
//       );
//     });

//     this.formasp.clear();
//     fact.formasp?.forEach((formasp) => {
//       this.formasp.push(
//         this.fb.group({
//           formaspstamp: [formasp.formaspstamp, Validators.required],
//           titulo: [formasp.titulo, Validators.required],
//           valor: [formasp.valor, Validators.required],
//         })
//       );
//     });
//   }

//   // Métodos para adicionar itens aos arrays
//   addFactLine(): void {
//     this.factl.push(
//       this.fb.group({
//         factlstamp: ['', Validators.required],
//         descricao: ['', Validators.required],
//         quant: [0, Validators.required],
//         preco: [0, Validators.required],
//         subtotall: [0, Validators.required],
//       })
//     );
//   }

//   addFactPrest(): void {
//     this.factprest.push(
//       this.fb.group({
//         factpreststamp: ['', Validators.required],
//         descricao: ['', Validators.required],
//         valor: [0, Validators.required],
//       })
//     );
//   }

//   addFactReg(): void {
//     this.factreg.push(
//       this.fb.group({
//         factregstamp: ['', Validators.required],
//         descricao: ['', Validators.required],
//         valorreg: [0, Validators.required],
//       })
//     );
//   }

//   addFormasp(): void {
//     this.formasp.push(
//       this.fb.group({
//         formaspstamp: ['', Validators.required],
//         titulo: ['', Validators.required],
//         valor: [0, Validators.required],
//       })
//     );
//   }

//   // Métodos para remover itens dos arrays
//   removeFactLine(index: number): void {
//     this.factl.removeAt(index);
//   }

//   removeFactPrest(index: number): void {
//     this.factprest.removeAt(index);
//   }

//   removeFactReg(index: number): void {
//     this.factreg.removeAt(index);
//   }

//   removeFormasp(index: number): void {
//     this.formasp.removeAt(index);
//   }

//   // Salva o formulário
//   saveFact(): void {
//     if (this.factForm.valid) {
//       const fact: Fact = this.factForm.value;
//       this.factService.createFacts(fact).subscribe(() => {
//         this.loadFacts(); // Recarrega os dados após salvar
//         this.factForm.reset(); // Reseta o formulário
//       });
//     }
//   }

//   // Deleta uma Fact
//   deleteFact(factstamp: string): void {
//     this.factService.deleteFacts(factstamp).subscribe(() => {
//       this.loadFacts(); // Recarrega os dados após deletar
//     });
//   }
// }
