import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';
import { Validator } from 'src/app/validator-util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    public fb:FormBuilder,
    public commonService: CommonService
    ) { }
    
  ngOnInit(): void {
  }

  navigateToSignUp(){
    this.router.navigate(['/signUp'])
  }
  public validator: Validator = new Validator();

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required,Validators.pattern(this.validator.emailRegex)]),
    "password": new FormControl('',[Validators.required,Validators.minLength(this.validator.minLengths.password)]),
  }); 
  
  

  login(){
   

    this.loginForm.markAllAsTouched();
    this.loginForm.markAsDirty();

    if(this.loginForm.invalid)
    return;

  }

}
