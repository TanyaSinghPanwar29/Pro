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
  toggleConnectButton = false
  profileDetails;
  constructor
  (private router: Router,
  private routeParams: ActivatedRoute,
  private commonService: CommonService,
  private util: UtilsService) { }

  ngOnInit(): void {
    this.setRouteParams();

  }
 
  navigateTo = (path: string) => {
    this.router.navigateByUrl(path);
  }

  setRouteParams = () => {
      this.routeParams.params.subscribe((params)  => {
        this.profileParams = params;
        this.getUserProfileInfo(params.username);
        if(!this.profileParams.selfProfile){
          this.getContactStatus();
        }
      })
  }

  getContactStatus(){
    let requestPayload = {
      sender: this.util.getUserName(),
      receiver: this.profileParams.username
    }
    
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

  connect(){
    
    var connect_payload={
      sender: this.util.getUserName(),
      reciever: this.profileParams
    }
    this.commonService.makePostRequest(ApplicationURLs.connect, connect_payload).subscribe((res) =>{
      console.log(res)
    })
  }

}
