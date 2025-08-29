import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header-militar',
  standalone: true,
  templateUrl: './header-militar.component.html',
  styleUrl: './header-militar.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, TranslateModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class HeaderMilitarComponent {
  @Input() nimMilitar: string = '';
  @Input() nomeMilitar: string = '';



}
