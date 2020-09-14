import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { LoginComponent } from './authentication/login/login.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { TextmsgComponent } from './authentication/textmsg/textmsg.component';
import { DetailsEditComponent } from './authentication/details-edit/details-edit.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [

  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   component: SignUpComponent,
  // },
  { 
    path: '',
    redirectTo: 'signUp', 
    pathMatch: 'full' 
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuardService],
  },
  {
    path: 'textmsg',
    component: TextmsgComponent,
    canActivate:[AuthGuardService] 
  },
  {
    path: 'details-edit',
    component: DetailsEditComponent,
    canActivate:[AuthGuardService] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
