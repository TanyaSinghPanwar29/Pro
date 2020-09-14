import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';
import { Validator } from 'src/app/validator-util';
import { ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serviceErrorMessage = { message: '', show: false }
  encryptSecretKey:string = "key";
  constructor(private router: Router,
    public fb: FormBuilder,
    public commonService: CommonService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
 

  validateUsername = (control: FormControl) => {
    let value = control.value +"";
    if(!value)
    return null;

    if((value.includes('.') || value.includes('#') || value.includes('$') || value.includes('[') || value.includes(']')) )
     return {
       valid: false
     };

     return null;
}


  buildForm = () => {
    this.loginForm = new FormGroup({
      "username": new FormControl('', [Validators.required, this.validateUsername]),
      "password": new FormControl('', [Validators.required, Validators.minLength(this.validator.minLengths.password)]),
      "login-button": new FormControl()
    });
  }


  navigateToSignUp() {
    this.router.navigate(['signUp'],{ replaceUrl: true })
  }
  public validator: Validator = new Validator();

  loginForm: FormGroup;
  
  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  login() {
    this.loginForm.markAllAsTouched();
    this.loginForm.markAsDirty();
    
    let Body = {
      username: this.loginForm.value.username,
      password: this.encryptData(this.loginForm.value.password)
    }
    console.log(Body);
   
    if (this.loginForm.invalid || this.loginForm.controls["login-button"].disabled)
      return;
    
    this.loginForm.controls["login-button"].disable();
    this.commonService.makePostRequest(ApplicationURLs.login, Body).subscribe(
      (res: any) => {
        this.loginForm.controls["login-button"].enable();
        if (!res) {
          return;
        }
        
        
        if(res.success){
          this.utilsService.setToken(res.token);
          this.utilsService.setUserName(Body.username);
          this.utilsService.setEmail(res.email)
          if(res.isUpdated){
            this.router.navigate(['textmsg'], { replaceUrl: true  });
          } 
          else if(!res.isUpdated){
            this.router.navigate(['details-edit',{
              heading: 'TELL US MORE ABOUT YOURSELF',
              button: 'SAVE',
              replaceUrl: true
            }]);
          }
        } else if(res.success === false){
          this.setServiceErrorMessage(res);
        }
      }


    )
  }
  setServiceErrorMessage = (res) => {
    this.serviceErrorMessage = {
      message: res.message,
      show: !res.success
    }
  }
}
