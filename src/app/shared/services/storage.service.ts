import { Injectable, inject } from '@angular/core';
import { SecureStorageService } from '@core/services/secure-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private secureStorage = inject(SecureStorageService);

  get(key: string) {
    try {
      const value = this.secureStorage.getItem(key);
      return value || {};
    } catch {
      return {};
    }
  }

  set(key: string, value: any): boolean {
    this.secureStorage.setItem(key, value);
    return true;
  }

  has(key: string): boolean {
    return this.secureStorage.hasItem(key);
  }

  remove(key: string) {
    this.secureStorage.removeItem(key);
  }

  clear() {
    this.secureStorage.clearSensitiveData();
  }
}

export class MemoryStorageService {
  private store: { [k: string]: string } = {};

  get(key: string) {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  has(key: string): boolean {
    return !!this.store[key];
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
