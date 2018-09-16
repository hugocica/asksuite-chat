import { Component, OnInit } from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        showCloseButton: true
    });

    constructor() { }

    ngOnInit() {
    }

}
