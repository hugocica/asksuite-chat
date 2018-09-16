import {Component, OnInit} from '@angular/core';
import {DashboardResumeService} from '../../../service/dashboard.resume.service';
import {CompanyService} from '../../../service/company.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserStorageService} from '../../../util/user.storage.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    dashInfo = {
        totalConversations: '',
        totalFacebook: '',
        totalMessages: '',
        totalOutOfCommercialDate: '',
        totalProposal: '',
        totalSite: ''
    };

    public items;


    private value: any = {};
    private _disabledV: string = '0';
    private disabled: boolean = false;

    splineHeight = 280;

    splineData;
    splineOptions = {
        series: {
            lines: {
                show: true
            },
            points: {
                show: true,
                radius: 4
            },
            splines: {
                show: false,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.5
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,

        tooltipOpts: {
            defaultTheme: false,
            content: (label, x, y) => {
                return parseInt(y)+"";
            }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            // max: 150, // optional: use it for a clear represetation
            tickColor: '#eee',
            // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
            tickFormatter: (v) => {
                return v/* + ' visitors'*/;
            }
        },
        shadowSize: 0
    };

    company = null;
    show = false;
    user;
    showSearchCompany = true;
    trackingIntentsCompany = {

    };

    constructor(private dashboardService: DashboardResumeService,
                private userService: UserStorageService,
                private route: ActivatedRoute,
                private spinner: NgxSpinnerService,
                private companyService: CompanyService) {
    }


    graphItemToData(array) {
        array.reverse();
        return array.map(item => {
            return [item.key, item.value];
        });
    }

    isSingleHotel(){
        return this.user.role == 'HOTEL_USER';
    }


    async ngOnInit() {

        this.user = await this.userService.getCurrentUser();

        if (this.isSingleHotel()){
            this.showSearchCompany = false;
            this.company = this.user.companiesIds[0];
        }

        console.log(this.user);

        this.items = this.route.snapshot.data.company.map(item => {
            return {companyId: item.companyId, name: item.json.hotelName ? item.json.hotelName : item.companyId}
        });

        console.log(this.items)

        this.refreshData(true);
    }

    refreshData(init?) {

        this.show = false;

        if (init) {

            // console.log("cai aqui no timeout")
            setTimeout(() => {
                this.spinner.show();
            }, 500);

        } else {
            this.spinner.show();
        }


        this.dashInfo = {
            totalConversations: '',
            totalFacebook: '',
            totalMessages: '',
            totalOutOfCommercialDate: '',
            totalProposal: '',
            totalSite: ''
        };
        this.splineData = [];


        this.dashboardService.resume(this.company).then(item => {
            this.dashInfo = (<any> item).resumeAll;

            let myItem = (<any> item).resumeMonth;

            this.splineData = [{
                'label': 'Atendimentos',
                'color': '#7266BA',
                'data': this.graphItemToData(myItem.conversations)
            }, {
                'label': 'Fora do Horário',
                'color': '#37BC9B',
                'data': this.graphItemToData(myItem.commecialHours)
            },
                {
                    'label': 'Total de cotações',
                    'color': '#E04815',
                    'data': this.graphItemToData(myItem.proposals)
                }
            ];


            if ((<any> item).trackingIntentsCompany){
                this.trackingIntentsCompany = (<any> item).trackingIntentsCompany;
            }

            this.spinner.hide();
            this.show = true;


            if (init) {
                console.log("cai aqui no timeout")
                setTimeout(() => {
                    this.spinner.hide();
                }, 500);
            }
        });
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
        this.company = value;
        this.refreshData();
    }

    removed(){
        this.company = null;
        this.refreshData();
    }

}
