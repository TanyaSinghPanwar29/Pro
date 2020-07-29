import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';
import { Validator } from 'src/app/validator-util';
import { ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    public fb: FormBuilder,
    public commonService: CommonService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

  navigateToSignUp() {
    this.router.navigateByUrl('signUp')
  }
  public validator: Validator = new Validator();

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl('', [Validators.required, Validators.pattern(this.validator.emailRegex)]),
    "password": new FormControl('', [Validators.required, Validators.minLength(this.validator.minLengths.password)]),
  });

 

  login() {


    this.loginForm.markAllAsTouched();
    this.loginForm.markAsDirty();
    let Body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
   
    if (this.loginForm.invalid)
      return;
    this.commonService.makePostRequest(ApplicationURLs.login, Body).subscribe(
      (res: any) => {
        if (!res || !res.token) {
          return;
        }
        
        
        if(res.success){
          this.utilsService.setToken(res.token);
          this.utilsService.setEmail(Body.email)
          if(res.isUpdated){
            this.router.navigateByUrl('textmsg');
          } 
          else if(!res.isUpdated){
            this.router.navigate(['details-edit',{
              heading: 'TELL US MORE ABOUT YOURSELF',
              button: 'SAVE'
            }]);
          }
        }
      }




    )
  }

}
