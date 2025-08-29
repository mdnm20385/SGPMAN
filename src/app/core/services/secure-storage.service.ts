import { Injectable, inject } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private readonly encryption = inject(EncryptionService);

  // Chaves sensíveis que devem ser criptografadas
  private readonly sensitiveKeys = [
    'usuario',
    'token',
    'ng-matero-token',
    'access_token',
    'password',
    'mensagemtoquen',
    'datasessao'
  ];

  constructor() { }

  /**
   * Armazena dados de forma segura no localStorage
   */
  setItem(key: string, value: any): void {
    const stringValue = JSON.stringify(value);

    if (this.isSensitiveKey(key)) {
      // Criptografa dados sensíveis
      const encryptedValue = this.encryption.encrypt(stringValue);
      const hash = this.encryption.generateHash(stringValue);

      localStorage.setItem(key, encryptedValue);
      localStorage.setItem(key + '_hash', hash);

      // Dados sensíveis armazenados de forma segura
    } else {
      // Dados não sensíveis armazenados normalmente
      localStorage.setItem(key, stringValue);
    }
  }

  /**
   * Recupera dados do localStorage de forma segura
   */
  getItem<T = any>(key: string): T | null {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return null;
    }

    if (this.isSensitiveKey(key)) {
      try {
        // Descriptografa dados sensíveis
        const decryptedValue = this.encryption.decrypt(storedValue);
        const storedHash = localStorage.getItem(key + '_hash');

        // Valida integridade dos dados
        if (storedHash && !this.encryption.validateIntegrity(decryptedValue, storedHash)) {
          // Possível alteração detectada nos dados - removendo dados comprometidos
          this.removeItem(key);
          return null;
        }

        return JSON.parse(decryptedValue);
      } catch (error) {
        // Erro na descriptografia ou parsing - dados podem estar corrompidos
        this.removeItem(key);
        return null;
      }
    } else {
      try {
        // Dados não sensíveis
        return JSON.parse(storedValue);
      } catch (error) {
        // Erro no parsing de dados não sensíveis
        return null;
      }
    }
  }

  /**
   * Remove item do localStorage e seu hash associado
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
    localStorage.removeItem(key + '_hash');
  }

  /**
   * Verifica se uma chave contém dados sensíveis
   */
  private isSensitiveKey(key: string): boolean {
    return this.sensitiveKeys.some(sensitiveKey =>
      key.toLowerCase().includes(sensitiveKey.toLowerCase())
    );
  }

  /**
   * Verifica se o item existe no localStorage
   */
  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Limpa todos os dados sensíveis do localStorage
   */
  clearSensitiveData(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (this.isSensitiveKey(key) || key.endsWith('_hash')) {
        localStorage.removeItem(key);
      }
    });
    // Dados sensíveis removidos do localStorage
  }

  /**
   * Migra dados existentes para formato criptografado
   */
  migrateToEncrypted(): void {
    // Iniciando migração de dados para formato seguro

    this.sensitiveKeys.forEach(key => {
      const existingData = localStorage.getItem(key);
      if (existingData && !existingData.startsWith('enc_')) {
        try {
          // Re-armazena usando criptografia
          const parsedData = JSON.parse(existingData);
          this.setItem(key, parsedData);
          // Dados migrados com sucesso
        } catch (error) {
          // Erro ao migrar dados - remove dados corrompidos
          localStorage.removeItem(key);
        }
      }
    });

    // Migração concluída
  }

  /**
   * Auditoria de segurança - lista dados armazenados
   */
  auditStorage(): void {
    const keys = Object.keys(localStorage);
    // Auditoria de armazenamento em andamento

    keys.forEach(key => {
      if (!key.endsWith('_hash')) {
        const value = localStorage.getItem(key);
        const isSensitive = this.isSensitiveKey(key);
        const isEncrypted = value?.startsWith('enc_');

        // Verificação de segurança dos dados armazenados
        if (isSensitive && !isEncrypted) {
          // Atenção: Dados sensíveis não criptografados detectados
        }
      }
    });
  }
}
