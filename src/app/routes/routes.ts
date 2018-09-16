import {LayoutComponent} from '../layout/layout.component';

import {
    AuthGuardService as AuthGuard
} from '../auth/auth.guard.service';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanyResolver} from '../service/resolver/company.resolver';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ConversationsComponent} from './conversations/conversations.component';
import {ChatComponent} from './chat/chat.component';
import {InstagramAuthComponent} from './instagram-auth/instagram-auth.component';

export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {
                path: 'home', canActivate: [AuthGuard], loadChildren: './home/home.module#HomeModule',
                resolve: {
                    company: CompanyResolver
                }
            },
            {
                path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
                resolve: {
                    company: CompanyResolver
                }
            },

            {
                path: 'change-password', canActivate: [AuthGuard], component: ChangePasswordComponent,
            },


            {
                path: 'instagram-auth', canActivate: [AuthGuard], component: InstagramAuthComponent,
                resolve: {
                    company: CompanyResolver
                }
            },

            {
                path: 'conversations', canActivate: [AuthGuard], component: ConversationsComponent,
                resolve: {
                    company: CompanyResolver
                }
            },

            {
                path: 'chat', canActivate: [AuthGuard], component: ChatComponent,
                resolve: {
                    company: CompanyResolver
                }
            },

        ]
    },
    // Not found
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'home'},

];
