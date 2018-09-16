import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {RequestUtil} from './requestutil';


@Injectable()
export class ConversationsService {

    constructor(private http: HttpClient, private requestUtil: RequestUtil) {
    }

    async list(companyId, page, pageSize): Promise<any> {

        const requestObj = await this.requestUtil.getDefaultRequestOptions();

        if (companyId != null) {
            requestObj['params'] = {companyId: companyId};
        }

        const body = {
            pageNumber : page,
            pageSize : pageSize,
            filter : companyId
        };

        return this.http.post(`${environment.url_rest}/listConversations`,  body).toPromise();
    }

    // async listWithPagination(companyId, page, pageSize) {
    //
    //     let requestObj = await this.requestUtil.getDefaultRequestOptions();
    //
    //     if (companyId != null){
    //         requestObj["params"] = {companyId: companyId};
    //     }
    //
    //     return this.http.post(`${environment.url_rest}/listConversations`,  requestObj ).toPromise();
    // }
}
