
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-grid.component.html',
  styleUrls: ['./produto-grid.component.scss']
})
export class ProdutoGridComponent {
  @Input() produtos: any[] = [];
  @Output() remover = new EventEmitter<number>();
  removerProduto(id: number) {
    this.remover.emit(id);
  }

  get total() {
    return this.produtos.reduce((s, p) => s + p.preco * p.quantidade, 0);
  }
}
