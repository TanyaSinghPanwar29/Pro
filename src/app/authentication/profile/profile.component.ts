import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';
import { ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileParams: any;
  profileInfo: any;
  profileDetails;
  constructor
  (private router: Router,
  private routeParams: ActivatedRoute,
  private commonService: CommonService,
  private util: UtilsService) { }

  ngOnInit(): void {
    this.setRouteParams();
    this.getProfileData();
  }
  getProfileData = () => {
    let body = {
      token: this.util.getToken()
    }
    // this.commonService.makePostRequest(ApplicationURLs.profileInfo,body)
  }

  setRouteParams = () => {
      this.routeParams.params.subscribe((params)  => {
        this.profileParams = params;
       console.log(this.profileParams.selfProfile)
        this.getUserProfileInfo(params.username)
      })
  }

  getUserProfileInfo(username){
    console.log(username)
     this.commonService.makeGetRequest(ApplicationURLs.userInfo, username).subscribe((res) =>{
       console.log(res)
       this.profileDetails = res;
     })
  }
  onEditProfile(){
   this.router.navigate(['details-edit', {
      heading: "EDIT YOUR PROFILE",
      button:"UPDATE"
   }])
  }

}
