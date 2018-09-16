import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

import { SettingsService } from '../../core/settings/settings.service';
import { ThemesService } from '../../core/themes/themes.service';
import { TranslatorService } from '../../core/translator/translator.service';
import {Router} from '@angular/router';
import {UserStorageService} from '../../util/user.storage.service';
import {ToasterService} from 'angular2-toaster';

@Component({
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html',
    styleUrls: ['./offsidebar.component.scss']
})
export class OffsidebarComponent implements OnInit, OnDestroy {

    currentTheme: any;
    selectedLanguage: string;
    clickEvent = 'click.offsidebar';
    $doc: any = null;

    constructor(public settings: SettingsService,  public toasterService: ToasterService, public themes: ThemesService, public translator: TranslatorService,  private router : Router, private userService : UserStorageService) {
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;

    }

    changePassword(){
        this.router.navigate(['change-password'])
    }


    async instagramAuth(){

        let user = await this.userService.getCurrentUser() ;

        if (this.isSingleHotel(user) && user.companiesIds[0] == 'faial' || user.role == 'global'){
            this.router.navigate(['instagram-auth'])
        }else{
            this.toasterService.pop("info", "Aviso", "Estamos em desenvolvimento com essa funcionalidade, em breve liberaremos para todos")
        }

    }

    isSingleHotel(user){
        return user.role == 'HOTEL_USER';
    }


    logout(){
        this.userService.logout();
        this.settings.layout.offsidebarOpen = false;
        this.router.navigate(['login'])
    }

    ngOnInit() {
        this.anyClickClose();
    }

    setTheme() {
        // this.themes.setTheme(this.currentTheme);
    }

    getLangs() {
        return this.translator.getAvailableLanguages();
    }

    setLang(value) {
        this.translator.useLanguage(value);
    }

    anyClickClose() {
        this.$doc = $(document).on(this.clickEvent, (e) => {
            if (!$(e.target).parents('.offsidebar').length) {
                this.settings.layout.offsidebarOpen = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.$doc)
            this.$doc.off(this.clickEvent);
    }
}
