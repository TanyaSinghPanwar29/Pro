import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule } from "@angular/forms";
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { TextmsgComponent } from './textmsg/textmsg.component';
import { DetailsEditComponent } from './details-edit/details-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, ProfileComponent, TextmsgComponent, DetailsEditComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
