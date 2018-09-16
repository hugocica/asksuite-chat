import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from 'environments/environment';
import {RequestUtil} from './requestutil';



@Injectable()
export class DashboardResumeService {

    constructor(private http : HttpClient, private requestUtil : RequestUtil) {}

   async resume(companyId) {

        let requestObj = await this.requestUtil.getDefaultRequestOptions();

        if (companyId != null){
            requestObj["params"] = {companyId: companyId};
        }

        console.log(requestObj);

        return this.http.get(`${environment.url_rest}/dashboardsAllResume`,  requestObj ).toPromise();
    }


    async allResumeMonth(companyId) {

        let requestObj = await this.requestUtil.getDefaultRequestOptions();

        if (companyId != null){
            requestObj["params"] = {companyId: companyId};
        }


        return this.http.get(`${environment.url_rest}/allResumeMonth`,  requestObj ).toPromise();
    }

    async graphsForDashboardDTO(companyId) {

        let requestObj = await this.requestUtil.getDefaultRequestOptions();

        if (companyId != null){
            requestObj["params"] = {companyId: companyId};
        }

        return this.http.get(`${environment.url_rest}/graphsForDashboardDTO`,  requestObj ).toPromise();
    }

}