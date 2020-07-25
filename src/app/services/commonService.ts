import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './apiEnums'
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService{
    public userPassword = new Subject() 
    constructor(
        private http: HttpClient
    ){}
   
    makePostRequest = (url,body) => {
        let fullUrl = BaseURL.url + url;
        return this.http.post(fullUrl,body);
     }

    editDetails = (url,body) =>{
        let fullUrl = BaseURL.url + url
        return this.http.post(fullUrl,body)
    }  
}