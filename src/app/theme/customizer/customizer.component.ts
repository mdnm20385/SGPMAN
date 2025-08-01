import { CdkDrag, CdkDragStart } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtxDrawer, MtxDrawerModule, MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { Subscription } from 'rxjs';

import { AppSettings, SettingsService } from '@core';
import { DisableControlDirective } from '@shared';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CdkDrag,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MtxDrawerModule,
    DisableControlDirective,
  ],
})
export class CustomizerComponent {
  @Output() optionsChange = new EventEmitter<AppSettings>();

  private readonly settings = inject(SettingsService);
  private readonly drawer = inject(MtxDrawer);
  private readonly fb = inject(FormBuilder);

  form = this.fb.nonNullable.group<AppSettings>(this.settings.options);

  private formSubscription = Subscription.EMPTY;

  get isHeaderPosAbove() {
    return this.form.get('headerPos')?.value === 'above';
  }

  get isNavPosTop() {
    return this.form.get('navPos')?.value === 'top';
  }

  get isShowHeader() {
    return this.form.get('showHeader')?.value === true;
  }

  private dragging = false;

  private drawerRef?: MtxDrawerRef;

  onDragStart(event: CdkDragStart) {
    this.dragging = true;
  }

  openPanel(templateRef: TemplateRef<any>) {
    if (this.dragging) {
      this.dragging = false;
      return;
    }

    this.drawerRef = this.drawer.open(templateRef, {
      position: this.form.get('dir')?.value === 'rtl' ? 'left' : 'right',
      width: '320px',
    });

    this.drawerRef.afterOpened().subscribe(() => {
      this.formSubscription = this.form.valueChanges.subscribe(value => {
        this.sendOptions(this.form.getRawValue());
      });
    });

    this.drawerRef.afterDismissed().subscribe(() => {
      this.formSubscription.unsubscribe();
    });
  }

  closePanel() {
    this.drawerRef?.dismiss();
  }

  sendOptions(options: AppSettings) {
    this.optionsChange.emit(options);
  }

  forceShowHeader() {
    // Força o header a ser visível
    this.form.patchValue({
      showHeader: true,
      headerPos: 'fixed'
    });

    // Limpa as configurações antigas do localStorage
    localStorage.removeItem('ng-matero-settings');

    // Obtém as configurações atuais do formulário e aplica defaults para valores undefined
    const currentOptions = this.form.value as AppSettings;
    const completeOptions: AppSettings = {
      navPos: currentOptions.navPos || 'side',
      dir: currentOptions.dir || 'ltr',
      theme: currentOptions.theme || 'auto',
      showHeader: true,
      headerPos: 'fixed',
      showUserPanel: currentOptions.showUserPanel ?? true,
      sidenavOpened: currentOptions.sidenavOpened ?? true,
      sidenavCollapsed: currentOptions.sidenavCollapsed ?? false,
      language: currentOptions.language || 'en-US'
    };

    this.sendOptions(completeOptions);

    // Recarrega a página para garantir que as mudanças sejam aplicadas
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
