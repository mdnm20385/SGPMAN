import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  add(message: string) {
 if (!environment.production) {
      // Apenas loga em desenvolvimento
    this.messages.push(message);
    }else{
    this.messages = [];
    }
  }

  clear() {
    this.messages = [];
  }
}
