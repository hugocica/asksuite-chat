import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { FlotDirective } from './directives/flot/flot.directive';
import { ColorsService } from './colors/colors.service';
import { NowDirective } from './directives/now/now.directive';
import {NgxSelectModule} from 'ngx-select-ex';
import {LoadingModule} from 'ngx-loading';
import {NgxSpinnerModule} from 'ngx-spinner';
import {Ng2TableModule} from 'ng2-table';

import { TimeAgoPipe } from '../pipe/time-ago.pipe';

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        InfiniteScrollModule,
        // AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        // CarouselModule.forRoot(),
        // CollapseModule.forRoot(),
        // DatepickerModule.forRoot(),
        // BsDropdownModule.forRoot(),
        // ModalModule.forRoot(),
        PaginationModule.forRoot(),
        // ProgressbarModule.forRoot(),
        // RatingModule.forRoot(),
        TabsModule.forRoot(),
        // TimepickerModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        // TypeaheadModule.forRoot(),
        ToasterModule,
        NgxSelectModule,
        Ng2TableModule,
    ],
    providers: [
        ColorsService,
        DatePipe,
        TimeAgoPipe,
    ],
    declarations: [
        TimeAgoPipe,
        FlotDirective,
        // SparklineDirective,
        // EasypiechartDirective,
        // CheckallDirective,
        // VectormapDirective,
        NowDirective,
        // ScrollableDirective,
        // JqcloudDirective
    ],
    exports: [
        TimeAgoPipe,
        CommonModule,
        FormsModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule,
        // AccordionModule,
        AlertModule,
        ButtonsModule,
        // CarouselModule,
        // CollapseModule,
        // DatepickerModule,
        // BsDropdownModule,
        // ModalModule,
        PaginationModule,
        // ProgressbarModule,
        // RatingModule,
        TabsModule,
        // TimepickerModule,
        TooltipModule,
        PopoverModule,
        // TypeaheadModule,
        ToasterModule,
        FlotDirective,
        // SparklineDirective,
        // EasypiechartDirective,
        // CheckallDirective,
        // VectormapDirective,
        NowDirective,
        // ScrollableDirective,
        // JqcloudDirective,
        NgxSelectModule,
        Ng2TableModule,
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
