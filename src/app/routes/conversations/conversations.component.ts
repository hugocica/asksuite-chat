import {Component, OnInit} from '@angular/core';
import {ConversationsService} from '../../service/conversations.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import {UserStorageService} from '../../util/user.storage.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {


    public items;
    company = null;
    show = false;
    user;
    rows;
    showSearchCompany = true;

    public columns: Array<any> = [
        {title: 'Contato', name: 'id',  sort: false},
        {title: 'Data', name: 'updatedAt' , sort: false},
        {
            title: 'Plataforma',
            name: 'desktopMobile',
            sort: false
        },
        {title: 'Fez Cotação?', name: 'requestPrice',  sort: false},
        {title: 'Cidade', name: 'city', sort: false},
        {title: 'País', name: 'country',  sort: false},
    ];

    public page: number = 1;
    public itemsPerPage: number = 20;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;


    rawRows = [];

    public config: any = {
        paging: true,
        className: ['table-striped', 'table-bordered', 'mb-0', 'd-table-fixed']
    };

    constructor(private conversationService: ConversationsService,
                private userService: UserStorageService,
                private route: ActivatedRoute,
                private spinner: NgxSpinnerService,
                private datePipe: DatePipe,
    ) {
    }


    graphItemToData(array) {
        array.reverse();
        return array.map(item => {
            return [item.key, item.value];
        });
    }

    isSingleHotel() {
        return this.user.role == 'HOTEL_USER';
    }

    async ngOnInit() {

        this.user = await this.userService.getCurrentUser();

        console.log(this.user);

        if (this.isSingleHotel()) {
            this.showSearchCompany = false;
            this.company = this.user.companiesIds[0];
        }

        console.log(this.user);

        this.items = this.route.snapshot.data.company.map(item => {
            return {companyId: item.companyId, name: item.json.hotelName ? item.json.hotelName : item.companyId}
        });

        this.refreshData(true);
    }

    refreshData(init?) {

        this.show = false;
        // if (init) {
        //
        //
        // } else {
        this.spinner.show();
        // }

        if (this.company){

            // let page = this.page - 1;
            this.conversationService.list(this.company, this.page, this.itemsPerPage).then(item => {



                let list = item["list"];

                // list.sort(function(a, b) {
                //     return b.id - a.id;
                // });

                let cont = item["total"] ;

                this.rawRows = list.map((itemConversation, index) => {

                    let desktopBrowsers = ['Windows', 'Mac OS', 'Linux', 'Chromium OS', 'Fedora', 'Ubuntu'];

                    let strDesktopMobile = '';


                    // console.log(itemConversation)

                    if (!itemConversation.browserData) {
                        strDesktopMobile = "";

                    }else if (itemConversation.browserData && itemConversation.browserData.name == "Whatsapp"){
                        strDesktopMobile = 'WhatsApp'
                    }else if (itemConversation && itemConversation.browserData && !itemConversation.browserData.os) {
                        strDesktopMobile = 'Facebook';
                    } else {
                        strDesktopMobile = desktopBrowsers.indexOf(itemConversation.browserData.os) > -1 ? 'Desktop' : 'Mobile' + " - "+ itemConversation.browserData.os;
                    }


                    let city = "";
                    let country = "";


                    if (itemConversation.location && itemConversation.location.city){

                        city = itemConversation.location.city + " - "+itemConversation.location.state_code
                        country = itemConversation.location.country
                    }


                    console.log(index, this.page);

                    return {

                        id: cont - (index) - (this.page-1)*this.itemsPerPage,
                        updatedAt: this.datePipe.transform(itemConversation.updatedAt, 'dd/MM/yyyy HH:mm'),
                        updateAtRaw: itemConversation.updatedAt,
                        desktopMobile: strDesktopMobile,
                        requestPrice: itemConversation.requestPrice > 0 ? 'Sim' : "Não",
                        city: city,
                        country: country
                    };

                });


                this.onChangeTable(this.config, cont);
                this.spinner.hide();
                this.show = true;





            });
        }else{

            this.onChangeTable(this.config,1);
            this.spinner.hide();
            this.show = true;

        }

    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
        this.company = value;
        this.refreshData();
    }

    removed() {
        this.company = null;
        this.refreshData();
    }

    public changePage(page: any, data: Array<any>): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public onChangeTable(config: any, total): any {

        // if (config.filtering) {
        //     (<any>Object).assign(this.config.filtering, config.filtering);
        // }
        //
        // if (config.sorting) {
        //     (<any>Object).assign(this.config.sorting, config.sorting);
        // }

        // let filteredData = this.changeFilter(this.rawRows, this.config);
        // let sortedData = this.changeSort(filteredData, this.config);


        this.rows = this.rawRows;
        this.length = total;
    }


    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName =  columns[i].sortColumn ? columns[i].sortColumn : columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {

        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name].toString().match(this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;

        return filteredData;
    }
}
