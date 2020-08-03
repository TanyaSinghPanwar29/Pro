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

  setUserName(username){
    if(!username){
      return ;
    }
    localStorage.setItem("username",username)
  }
  getUserName(){
    let UserName : any = localStorage.getItem("username");
    if(UserName ){
      return UserName;
    }
    else{
      //TO DO sigh out
    }
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
