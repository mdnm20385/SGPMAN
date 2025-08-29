import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly encryptionKey = 'SGPM_2024_SECURE_KEY_#@!$%^&*()_+';
  private readonly prefix = 'enc_';

  constructor() { }

  /**
   * Criptografa dados usando algoritmo simples de substituição
   * Adiciona salt e embaralhamento para maior segurança
   */
  encrypt(data: string): string {
    try {
      // Adiciona timestamp como salt
      const timestamp = Date.now().toString();
      const saltedData = timestamp + '|' + data;

      // Codifica em Base64 primeiro
      const base64Data = btoa(unescape(encodeURIComponent(saltedData)));

      // Aplica criptografia customizada
      let encrypted = '';
      for (let i = 0; i < base64Data.length; i++) {
        const charCode = base64Data.charCodeAt(i);
        const keyChar = this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
        encrypted += String.fromCharCode(charCode ^ keyChar);
      }

      // Codifica novamente em Base64 e adiciona prefixo
      return this.prefix + btoa(unescape(encodeURIComponent(encrypted)));
    } catch (error) {
      console.error('Erro na criptografia:', error);
      return data; // Fallback para dados originais
    }
  }

  /**
   * Descriptografa dados criptografados
   */
  decrypt(encryptedData: string): string {
    try {
      // Verifica se tem o prefixo de dados criptografados
      if (!encryptedData.startsWith(this.prefix)) {
        return encryptedData; // Retorna dados não criptografados
      }

      // Remove o prefixo
      const withoutPrefix = encryptedData.substring(this.prefix.length);

      // Decodifica da Base64
      const decoded = decodeURIComponent(escape(atob(withoutPrefix)));

      // Aplica descriptografia
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i);
        const keyChar = this.encryptionKey.charCodeAt(i % this.encryptionKey.length);
        decrypted += String.fromCharCode(charCode ^ keyChar);
      }

      // Decodifica da Base64 novamente
      const base64Decoded = decodeURIComponent(escape(atob(decrypted)));

      // Remove o salt (timestamp)
      const parts = base64Decoded.split('|');
      if (parts.length >= 2) {
        return parts.slice(1).join('|'); // Remove o timestamp e retorna os dados
      }

      return base64Decoded;
    } catch (error) {
      console.error('Erro na descriptografia:', error);
      return encryptedData; // Fallback para dados originais
    }
  }

  /**
   * Ofusca dados sensíveis para logs (mostra apenas primeiros e últimos caracteres)
   */
  obfuscate(data: string, visibleChars: number = 3): string {
    if (!data || data.length <= visibleChars * 2) {
      return '*'.repeat(data?.length || 8);
    }

    const start = data.substring(0, visibleChars);
    const end = data.substring(data.length - visibleChars);
    const middle = '*'.repeat(Math.max(4, data.length - visibleChars * 2));

    return start + middle + end;
  }

  /**
   * Gera hash simples para verificação de integridade
   */
  generateHash(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Converte para 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Valida se os dados não foram alterados
   */
  validateIntegrity(data: string, hash: string): boolean {
    return this.generateHash(data) === hash;
  }
}
