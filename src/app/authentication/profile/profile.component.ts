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
  contactStatus: Object;
  constructor
  (private router: Router,
  private routeParams: ActivatedRoute,
  private commonService: CommonService,
  private util: UtilsService) { }

  ngOnInit(): void {
    this.setRouteParams();
    if(this.profileParams){
      if(this.profileParams.selfProfile == 'false'){
        this.getContactStatus();
      }
    }
    
  }
 
  navigateTo = (path: string) => {
    this.router.navigateByUrl(path);
  }

  setRouteParams = () => {
      this.routeParams.params.subscribe((params)  => {
        this.profileParams = params;
        this.getUserProfileInfo(params.username);
      })
  }

  getContactStatus(){
    let requestPayload = {
      sender: this.util.getUserName(),
      receiver: this.profileParams.username
    }
    this.commonService.makePostRequest(ApplicationURLs.userStatus,requestPayload)
    .subscribe((res) => {
      this.contactStatus = res;
    })
  }

  getUserProfileInfo(username){
    console.log(username)
     this.commonService.makeGetRequest(ApplicationURLs.userInfo, username).subscribe((res) =>{
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
      receiver: this.profileParams.username
    }
    this.commonService.makePostRequest(ApplicationURLs.connect, connect_payload).subscribe((res) =>{
      this.setContactStatus('request_sent');
    })
  }

  friendRequestStatus = (status) => {
    let request = {
      sender: this.profileParams.username,
      receiver: this.util.getUserName(),
      accepted: (status === 1) ? true : false
    }
    this.commonService.makePostRequest(ApplicationURLs.handleFriendRequest,request)
    .subscribe((res) => {
      this.contactStatus = {};
      this.contactStatus[(status === 1) ? 
        'already_a_contact' : 
        'not_a_contact'
      ] = true;
    })
  }

  getStatusFlag = (status) => {
    return this.contactStatus[status] ? true : false;
  }

  setContactStatus = (status) => {
    this.contactStatus = {};
    this.contactStatus[status] = true;
  }

}
