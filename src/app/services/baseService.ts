import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export abstract class BaseService {
private _http: HttpClient;
public _router: Router;
responseHIX_HAD;
constructor(_http: HttpClient, _router: Router) {
this._http = _http;
//this._router = _router;
}

public extractData(res) {
if (res.status === 302) {
const redir = res.headers.get("Location");
if (redir && redir.indexOf("mhcauth") !== -1) {
alert("Session has timed out!");
window.location.href = "/";
}
} else if (res.status != 403) {
 //Resetting last API HIT, which is used in session timeout timer
let contentType
if(res.headers) {
contentType = res.headers.get('Content-type');
}

if (!contentType) {
if(res.headers) {
contentType = res.headers.get('content-type');
}
}
let body;
if(contentType) {
if (contentType.startsWith('application/json') || contentType.startsWith('text/html')) {
body = res.body;
//Handle User Messages
if(body){
if(!body.success){
}
}
return body || {}
} else {
body = res.text();
alert("Unexpected Response: " + res.text());
}
} else {
body = res;
}

return body || {}
}
return {};
}

protected static createMessageDiv(html, type) {
var div = document.createElement('div');
html = html.trim(); // Never return a text node of whitespace as the result
div.setAttribute("class", type);
div.innerHTML = html;
return div;
}

public clearErrorDivs() {
var msgs = document.getElementsByClassName('messageDiv');
if (msgs) {
for (let i = 0; i < msgs.length; i++) {
msgs[i].innerHTML = '';
}
}

var highlights = document.getElementsByClassName('uxHighlight');
if (highlights) {
while (highlights.length > 0) { // Live array getting updated
highlights[0].setAttribute("class", highlights[0].getAttribute("origcss"));
}
}
}
protected http() {
return this._http;
}
protected makeGetRequest(url: string, headers: HttpHeaders) {
var fullUrl = url;
const httpOptions = {headers: headers, withCredentials: true};
return this._http.get(fullUrl, {headers:httpOptions.headers,observe:'response',withCredentials:true});
}
protected makePostRequest(url: string, body: any, headers: HttpHeaders){
var fullUrl = url;
const httpOptions = {headers: headers, withCredentials: true};
return this._http.post(fullUrl, body,{headers:httpOptions.headers,observe:'response',withCredentials:true});
}
}