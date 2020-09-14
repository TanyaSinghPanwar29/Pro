import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Validator } from 'src/app/validator-util';
import { CommonService } from 'src/app/services/commonService';
import { ApplicationURLs } from 'src/app/services/apiEnums';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public validator: Validator = new Validator();

  signUpForm: FormGroup;
  encryptSecretKey:string = "key";
  constructor(
    public router: Router,
    public fb:FormBuilder,
    public commonService: CommonService
  ) 
  {}

  ngOnInit(): void {
    this.buildForm();
  }
  
  buildForm = () => {
    this.signUpForm = new FormGroup({
      "user_name": new FormControl('',[Validators.required,this.validateUsername]),
      "email": new FormControl('',[Validators.required,Validators.pattern(this.validator.emailRegex)]),
      "password": new FormControl('',[Validators.required,Validators.minLength(this.validator.minLengths.password)]),
      "cpassword": new FormControl('',[Validators.required])
    }); 
  }

  navigateToSignIn = () => {
    this.router.navigate(['login'], { replaceUrl: true })
  }

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
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

  signUp = () => {
    this.signUpForm.markAllAsTouched();
    this.signUpForm.markAsDirty();
    
    if(this.signUpForm.invalid)
    return;

    let body = {
      username: this.signUpForm.get('user_name').value,
      email: this.signUpForm.get('email').value,
      password:  this.encryptData(this.signUpForm.value.password),
    }
    this.commonService.makePostRequest(ApplicationURLs.signUp,body).subscribe((res:any)=>{
      if(res.success){
        this.router.navigate(['login'], { replaceUrl: true  })
      } else{
        //TO DO
      }
    });    
  }
  

}
