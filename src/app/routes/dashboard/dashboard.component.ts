import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../service/company.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {DashboardResumeService} from '../../service/dashboard.resume.service';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserStorageService} from '../../util/user.storage.service';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


    pieOptions = {
        series: {
            pie: {
                show: true,
                innerRadius: 0,
                label: {
                    show: true,
                    radius: 0.8,
                    formatter: function (label, series) {
                        return '<div class="flot-pie-label">' +
                            Math.round(series.percent) +
                            '%</div>';
                    },
                    background: {
                        opacity: 0.8,
                        color: '#eee'
                    }
                }
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
            cssClass: 'flotTip',
            content: function (label, x, y) {
                return label + ' : ' + y;
            },
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        },
    };

    totalHour;
    totalWeek;
    pieData;
    pieDataPlatforms;
    companyId;
    barOptions;
    barOptionsTotalHour;
    items;
    show;
    showSearchCompany = true;
    user;


    constructor(private dashboardService: DashboardResumeService,
                private slimLoadingBarService: SlimLoadingBarService,
                private route: ActivatedRoute,
                private userService : UserStorageService,
                private spinner: NgxSpinnerService,
                private companyService: CompanyService) {
    }

    graphItemToData(array) {
        return array.map(item => {
            return [item.key, item.value];
        });


    }

    findByKey(array, key) {
        return array.find(item => {
            console.log(item.key, key);
            return item.key == key;
        });

    }

    getGlobalBarOptions() {
        return {
            series: {
                bars: {
                    align: 'center',
                    lineWidth: 0,
                    show: true,
                    barWidth: 0.6,
                    fill: 0.9,
                },
            },

            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) {
                    return x + ' : ' + y;
                }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
    }


    isSingleHotel(){
        return this.user.role == 'HOTEL_USER';
    }


    async ngOnInit() {

        this.user = await this.userService.getCurrentUser();

        if (this.isSingleHotel()){
            this.showSearchCompany = false;
        }

        this.items = this.route.snapshot.data.company.map(item => {
            return {companyId: item.companyId, name: item.json.hotelName ? item.json.hotelName : item.companyId}
        });

        this.refreshData();
    }

    refreshData(){
        this.spinner.show();
        this.show = false;

        this.dashboardService.graphsForDashboardDTO(this.companyId).then(item => {
                this.barOptionsTotalHour = this.getGlobalBarOptions();

                let labelsTemp = [];
                this.barOptionsTotalHour.legend = {
                    noColumns: 2,
                    container: $('#chartLegend'),
                    labelFormatter: function (label, series) {
                        if (labelsTemp.indexOf(label) == -1) {
                            labelsTemp.push(label);
                            return label;
                        } else {
                            return null;
                        }
                    }

                };

                this.barOptions = this.getGlobalBarOptions();
                this.barOptions.legend = {
                    container: $('#chartLegendDayOfWeek'),
                    noColumns: 2,
                    labelFormatter: function (label, series) {
                        // series is the series object for the label

                        if (labelsTemp.indexOf(label) == -1) {
                            labelsTemp.push(label);
                            return label;
                        } else {
                            return null;
                        }
                    }
                };

                let myItem = <any> item;
                let totalHour = myItem.totalByHour;
                let transform = this.graphItemToData(myItem.totalByHour);

                this.totalHour = [
                    {
                        'label': 'Fora do Horário comercial',
                        'color': '#E04815',
                        'data': [transform[0]],
                    },
                    {
                        'label': 'Horário Comercial',
                        'color': '#258897',
                        'data':[transform[1]]
                    },
                    {
                        'label': 'Fora do Horário comercial',
                        'color': '#E04815',
                        'data': [transform[2]]
                    },
                    {
                        'label': 'Horário Comercial',
                        'color': '#258897',
                        'data': [transform[3]]
                    },
                    {
                        'label': 'Fora do Horário comercial',
                        'color': '#E04815',
                        'data': [transform[4]]
                    }
                ];


                let totalInCommercialHour = totalHour[1].value + totalHour[3].value;
                let totalInNonCommercialHour = totalHour[0].value + totalHour[2].value + totalHour[4].value;


                this.pieData = [{
                    'label': 'Horário Comercial',
                    'color': '#258897',
                    'data': totalInCommercialHour
                }, {
                    'label': 'Fora do Horário comercial',
                    'color': '#E04815',
                    'data': totalInNonCommercialHour
                }];


                transform = this.graphItemToData(myItem.totalByDayOfWeek);
                this.totalWeek = [

                    {
                        'label': 'Dia de Semana',
                        'color': '#0F810F',
                        'data':
                            [transform[1], transform[2], transform[3], transform[4], transform[5]]
                    },

                    {
                        'label': 'Final de Semana',
                        'color': '#E04815',
                        'data':
                            [transform[6]]
                    },
                    {
                        'label': 'Final de Semana',
                        'color': '#E04815',
                        'data':
                            [transform[0]]
                    },]
                ;

                let totalByPlatform = myItem.totalByPlatform;

                this.pieDataPlatforms = [{
                    'label': 'Facebook',
                    'color': '#4267B2',
                    'data': this.findByKey(totalByPlatform, 'facebook').value
                }, {
                    'label': 'Desktop',
                    'color': '#7BC2DB',
                    'data': this.findByKey(totalByPlatform, 'desktop').value
                },

                    {
                        'label': 'Mobile',
                        'color': '#E04815',
                        'data': this.findByKey(totalByPlatform, 'mobile').value
                    },

                    {
                        'label': 'WhatsApp',
                        'color': '#24A652',
                        'data': this.findByKey(totalByPlatform, 'whatsapp').value
                    }

                ];
                this.spinner.hide();
                this.show = true;
            }
        );
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
        this.companyId = value;
        this.refreshData();
    }

    removed(){
        this.companyId = null;
        this.refreshData();
    }

}
