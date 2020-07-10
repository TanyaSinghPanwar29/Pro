import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './apiEnums'

@Injectable({
    providedIn: 'root'
})
export class CommonService{

    constructor(
        private http: HttpClient
    ){}
    
    makePostRequest = (url,body) =>
     {
        let fullUrl = BaseURL.url + url;
        console.log(fullUrl)
        return this.http.post(fullUrl,body
            // {
            //     headers: new HttpHeaders ({ 'Content-Type': 'application/json' }),
               
            //  }
               )
            
     }
}