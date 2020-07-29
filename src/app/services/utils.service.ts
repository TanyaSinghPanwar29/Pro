import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {  }

  setToken(token){
    if(!token){
      return ;
   }
   localStorage.setItem("token",token) 
  } 
  setEmail(email){
    if(!email){
      return ;
    }
    localStorage.setItem("email",email)
  }
  getToken(){
    let getToken:any = localStorage.getItem("token");
    console.log(getToken)
    if(getToken){
      return getToken;
    }
    else{
      //TO DO sign out
    }
  }

  getEmail(){
    let getEmail = localStorage.getItem("email");
    if(getEmail){
      return getEmail
    }
    else{
      //TO DO 
    }
  }
}
