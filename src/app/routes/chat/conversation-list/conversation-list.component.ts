import {Component, OnInit} from '@angular/core';
import {ChatService} from '@service/chat.service';
import {ConversationsService} from '@service/conversations.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {UserStorageService} from '@util/user.storage.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-conversation-list',
    templateUrl: './conversation-list.component.html',
    styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {

    constructor(
        private chatService: ChatService,
        private conversationsService: ConversationsService,
        private userService: UserStorageService,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private datePipe: DatePipe,
    ) {
    }

    ngOnInit() {

    }

}
