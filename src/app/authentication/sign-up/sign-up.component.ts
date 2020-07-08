import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Validator } from 'src/app/validator-util';
import { CommonService } from 'src/app/services/commonService';
import { ApplicationURLs } from 'src/app/services/apiEnums';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public validator: Validator = new Validator();

  signUpForm: FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required,Validators.pattern(this.validator.emailRegex)]),
    "password": new FormControl('',[Validators.required,Validators.minLength(this.validator.minLengths.password)]),
    "confirm_password": new FormControl('',[Validators.required,Validators.minLength(this.validator.minLengths.password)])
  }); 
  
  constructor(
    public router: Router,
    public fb:FormBuilder,
    public commonService: CommonService
  ) 
  {}

  ngOnInit(): void {
    
    // this.buildForm();
  }
  // buildForm = () => {
  //   this.signUpForm = 
  // }
  navigateToSignIn = () => {
    this.router.navigateByUrl('login')
  }

  signUp = () => {
    this.signUpForm.markAllAsTouched();
    this.signUpForm.markAsDirty();

    if(this.signUpForm.invalid)
    return;

    let body = {
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value
    }
    console.log(body)
    this.commonService.makePostRequest(ApplicationURLs.signUp,body).subscribe((res)=>{
      console.log(res,"FUCK THIS SHIT AM OUT")
    });
    
    
  }

}
