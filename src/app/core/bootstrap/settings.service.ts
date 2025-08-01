import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppDirectionality, LocalStorageService } from '@shared';
import { AppSettings, AppTheme, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly key = 'ng-matero-settings';

  private readonly store = inject(LocalStorageService);
  private readonly mediaMatcher = inject(MediaMatcher);
  private readonly document = inject(DOCUMENT);
  private readonly dir = inject(AppDirectionality);

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() {
    return this.notify$.asObservable();
  }

  private htmlElement!: HTMLHtmlElement;

  options: AppSettings;

  themeColor: Exclude<AppTheme, 'auto'> = 'light';

  constructor() {
    const storedOptions = this.store.get(this.key);
    this.options = Object.assign(defaults, storedOptions);

    // FORÇAR HEADER SEMPRE VISÍVEL - DEBUG
    this.options.showHeader = true;
    this.options.headerPos = 'fixed';

    this.themeColor = this.getThemeColor();
    this.htmlElement = this.document.querySelector('html')!;
  }

  reset() {
    this.store.remove(this.key);

    // Força as configurações padrão com header visível
    this.options = Object.assign({}, defaults);
    this.options.showHeader = true;
    this.options.headerPos = 'fixed';
    this.store.set(this.key, this.options);
  }

  getThemeColor() {
    // Check whether the browser support `prefers-color-scheme`
    if (
      this.options.theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      return isSystemDark ? 'dark' : 'light';
    } else {
      return this.options.theme as Exclude<AppTheme, 'auto'>;
    }
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  setDirection() {
    this.dir.value = this.options.dir;
    this.htmlElement.dir = this.dir.value;
  }

  setTheme() {
    this.themeColor = this.getThemeColor();

    if (this.themeColor === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }
}
