import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule,MatListModule,],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
 products = ['Produto 1', 'Produto 2', 'Produto 3']; // Exemplo de produtos

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectProduct(product: string): void {
    this.dialogRef.close(product);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
