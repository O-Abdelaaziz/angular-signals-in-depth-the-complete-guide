import { Injectable, signal } from '@angular/core';
import { Message, MessageSeverity } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  #messageSignal = signal<Message | null>(null);
  public message = this.#messageSignal.asReadonly();

  public showMessage(text: string, severity: MessageSeverity) {
    this.#messageSignal.set({
      text,
      severity,
    });
  }

  public hideMessage() {
    this.#messageSignal.set(null);
  }
}
