import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';

import { menu } from './menu';
import { routes } from './routes';
import {PagesModule} from './pages/pages.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ChatComponent } from './chat/chat.component';
import { ConversationListComponent } from './chat/conversation-list/conversation-list.component';
import { InstagramAuthComponent } from './instagram-auth/instagram-auth.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule,
    ],
    declarations: [
        DashboardComponent,
        ChangePasswordComponent,
        ConversationsComponent,
        ChatComponent,
        ConversationListComponent,
        InstagramAuthComponent
    ],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
