import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseURL } from './apiEnums'
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService{
    
    constructor(
        private http: HttpClient
    ){}
   

    makePostRequest = (url,body) => {
        let fullUrl = BaseURL.url + url;
        return this.http.post(fullUrl,body);
     }
    makeGetRequest =  (url,params) =>{
        let httpParams = new HttpParams().set('username',params);
        let fullUrl = BaseURL.url + url;
        // if(params){
        //     for(let p in params){
        //         httpParams.set(p,params[p]);
        //     }
        // }
        return this.http.get(fullUrl,{
          params: httpParams
        });
    }
    

}