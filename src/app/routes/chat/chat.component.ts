import {Component, OnInit} from '@angular/core';
import {ChatService} from '@service/chat.service';
import {ConversationsService} from '@service/conversations.service';
import {ActivatedRoute} from '@angular/router';
import {UserStorageService} from '@util/user.storage.service';
// import {DatePipe} from '@angular/common';
// import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  items;
  company = null;
  show = false;
  user;
  showSearchCompany = true;

  conversations: Array<any>;
  hasMoreConversations: boolean;
  selectedConversation: any;
  chat: Array<any>;
  showDetails: boolean;
  conversationsLoading: boolean;
  chatLoading: boolean;

  public page = 1;
  public itemsPerPage = 20;

  constructor(
    private chatService: ChatService,
    private conversationsService: ConversationsService,
    private userService: UserStorageService,
    private route: ActivatedRoute,
  ) {
    this.showDetails = false;
    this.conversationsLoading = false;
    this.chatLoading = false;
    this.resetConversationParameters();
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.userService.getCurrentUser()
      .then(user => {
        this.user = user;

        if (this.isSingleHotel()) {
          this.showSearchCompany = false;
          this.company = this.user.companiesIds[0];
        }

        this.items = this.route.snapshot.data.company.map(item => {
          return {companyId: item.companyId, name: item.json.hotelName ? item.json.hotelName : item.companyId};
        });

        // TEST ONLY
        // TEST ONLY
        // TEST ONLY
        // TEST ONLY
        // TEST ONLY
        // TEST ONLY
        setTimeout(() => this.selected('acquasuites'), 100);
      });
  }

  // card() {
  //   let adaptiveCard = new AdaptiveCards.AdaptiveCard();
  //   adaptiveCard.parse(scope.item.item.jsonMessage.attachments[0].content);
  //   let renderedCardNew = adaptiveCard.render();

  //   if (renderedCardNew) {
  //     elem.html(renderedCardNew.outerHTML);
  //   }
  // }

  private isSingleHotel() {
    // console.log('isSingleHotel()', this.user.role, this.user.role === 'HOTEL_USER');
    return this.user.role === 'HOTEL_USER';
  }

  private getCompanyConversations() {
    if (this.hasMoreConversations && this.company) {
      this.conversationsLoading = true;
      this.conversationsService.list(this.company, this.page, this.itemsPerPage)
        .then(conversationsData => {
          // console.log('.then()', conversationsData);
          const list = conversationsData.list.map(this.mapConversations);

          this.conversations = this.conversations.concat(list);
          this.page++;
          this.hasMoreConversations = conversationsData.hasNext;
          // console.log('conversas: ', this.conversations, conversationsData.list);

          this.conversationsLoading = false;

          // TEST ONLY
          // TEST ONLY
          // TEST ONLY
          // TEST ONLY
          // TEST ONLY
          // TEST ONLY
          if (list.length > 0) {
            setTimeout(() => this.openChat(list[0]), 100);
          }
        });
    }
  }

  public openChat(conversation) {
    // console.log('openChat()', conversation);
    this.selectedConversation = conversation;
    this.getChat();
  }

  private getChat() {
    this.chatLoading = true;
    // console.log('getChat()', this.selectedConversation);
    this.chatService.getMessages(this.selectedConversation.id)
      .then(chatMessages => {
        console.log(chatMessages);
        this.chat = chatMessages;

        this.updateScroll();
        this.chatLoading = false;
      });
  }

  private updateScroll() {
    setTimeout(() => {
      const element = document.getElementById('chat-panel');
      element.scrollTop = element.scrollHeight;
      // console.log('updateScroll()', element, element.scrollTop, element.scrollHeight);
    }, 0);
  }

  public onConversationScrollDown() {
    this.getCompanyConversations();
    // console.log('scroll event!', this.page, this.itemsPerPage);
  }

  private resetConversationParameters() {
    this.page = 1;
    this.chat = [];
    this.conversations = [];
    this.selectedConversation = null;
    this.hasMoreConversations = true;
  }

  public selected(value: any): void {
    // console.log('Selected value is: ', value);
    this.company = value;
    this.resetConversationParameters();
    this.getCompanyConversations();
  }

  public removed() {
    this.company = null;
    this.resetConversationParameters();
    this.getCompanyConversations();
  }

  public toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  private mapConversations(conversation) {
    const item = {
      id: conversation.conversationId,
      source: 'S',
      backgroundColor: '#e04815',
      name: 'Usuário da Plataforma',
      timeAgo: new Date(conversation.updatedAt),
      messages: `${conversation.countMessages} mensagens`,
      quoted: conversation.requestPrice,
    };

    if (conversation.countMessages === 1) {
      item.messages = item.messages.replace('mensagens', 'mensagem');
    }

    if (conversation.botUserData && conversation.botUserData[0].user) {
      // console.log(conversation.botUserData[0].user, 'botUserData length:' + conversation.botUserData.length);
      const user = conversation.botUserData[0].user;
      item.name = `${user.first_name} ${user.last_name}`;
    }

    if (conversation.source) {
      if (conversation.source === 'facebook') {
        item.source = 'F';
        item.backgroundColor = '#4267b2';
      } else {
        item.source = 'W';
        item.backgroundColor = '#47bd31';
      }
    }

    return item;
  }

}
