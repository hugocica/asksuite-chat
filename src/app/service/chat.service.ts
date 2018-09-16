import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {RequestUtil} from './requestutil';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChatService {

  constructor(
    private http: HttpClient,
    private requestUtil: RequestUtil) {
  }

  getMessages(conversationId): Promise<any> {
    return this.http.get(`${environment.url_rest}/conversationhistories/${conversationId}`)
      .map((messages: any[]) => {
        return messages.map(this.mapMessage);
      })
      .toPromise();
  }

  /**
   * Maps multiple chat formats to a single output
   * @param originalMessage The original message from either the website, Facebook or Whatsapp
   */
  mapMessage(originalMessage) {
    const message = {
      id: originalMessage.id,
      createdAt: originalMessage.createdAt,
      conversationId: originalMessage.conversationId,
      botUserId: originalMessage.botUserId,
      companyId: originalMessage.companyId,
      type: originalMessage.type,
      lastDialog: originalMessage.lastDialog,
      text: null,
      buttons: [],
      pictures: [],
      form: null
    };

    const jsonMsg = originalMessage.jsonMessage;

    if (jsonMsg.text) {
      message.text = jsonMsg.text;
    }

    // Buttons
    if (jsonMsg.quick_replies) {
      jsonMsg.quick_replies.forEach(button => {
        message.buttons.push({
          label: button.payload.replace(/([a-z\.=]+({"label":")|(",".+|"}))/gi, ''),
          shortLabel: button.title,
          payload: button.payload,
        });
      });
    }

    // Gallery's pictures
    if (jsonMsg.gallery || (jsonMsg.attachment && jsonMsg.attachment.payload.elements)) {

      const originalPictures = (jsonMsg.gallery || jsonMsg.attachment.payload.elements);

      originalPictures.forEach(originalPicture => {
        const picture = {
          title: originalPicture.title,
          subTitle: originalPicture.subtitle,
          url: originalPicture.image_url,
          buttons: [],
        };

        originalPicture.buttons.forEach(button => {
          picture.buttons.push({
            label: button.payload.replace(/([a-z\.=]+({"label":")|(",".+|"}))/gi, ''),
            shortLabel: button.title,
            payload: button.payload
          });
        });

        message.pictures.push(picture);
      });
    }

    // Microsoft Adaptative Cards
    if (jsonMsg.attachments) {
      message.form = originalMessage.attachments;
    }

    return message;
  }

}
