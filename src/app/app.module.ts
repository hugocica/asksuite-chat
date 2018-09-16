import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import {LOCALE_ID, NgModule} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import {PinStorage} from './util/pin.storage';
import {UserStorageService} from './util/user.storage.service';
import {SecureJsonStorage} from './util/secure.json.storage';
import {HashGenerator} from './util/hash.generator';
import {AuthGuardService} from './auth/auth.guard.service';
import {LoginService} from './service/login.service';
import {ToasterService} from 'angular2-toaster';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {RequestUtil} from './service/requestutil';
import {DashboardResumeService} from './service/dashboard.resume.service';


import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {CompanyService} from './service/company.service';
import {CompanyResolver} from './service/resolver/company.resolver';
import {NgxSpinnerModule} from 'ngx-spinner';
import {UserService} from './service/user.service';
import {ConversationsService} from './service/conversations.service';
import {ChatService} from './service/chat.service';
import {InstagramApiService} from './service/instagram-api.service';

registerLocaleData(ptBr);
// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        IonicStorageModule.forRoot(),
        LayoutModule,
        SharedModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        PinStorage,
        UserStorageService,
        SecureJsonStorage,
        HashGenerator,
        AuthGuardService,
        LoginService,
        ToasterService,
        RequestUtil,
        DashboardResumeService,
        CompanyService,
        CompanyResolver,
        UserService,
        InstagramApiService,
        ConversationsService,
        ChatService,
        { provide: LOCALE_ID, useValue: 'pt' },


],
    bootstrap: [AppComponent]
})
export class AppModule { }
