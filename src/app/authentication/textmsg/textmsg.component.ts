import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { BaseURL, ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';
import { CommonService } from 'src/app/services/commonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-textmsg',
  templateUrl: './textmsg.component.html',
  styleUrls: ['./textmsg.component.css']
})
export class TextmsgComponent implements OnInit {
  @ViewChild("messageParent") message_parent: ElementRef
  public socket;
  search: string;
  selectedChat;
  userNames;
  userFriends;
  sidebarid: string;
  showSearchResults: boolean = false;
  showSideBar: boolean = false;

  constructor(private utilsService: UtilsService, private router: Router, private commonService: CommonService) {
    this.connect();
  }
  message: string;
  messageArray = [];
  resArrays;
  ngOnInit(): void {
    this.socket.on(this.utilsService.getUserName(), (data) => {
      // this.messageArray.push(data);
      if(this.userFriends){
        if(this.userFriends[data.sentBy].messageArray){
          this.userFriends[data.sentBy].messageArray.push(data);
        } else {
          this.userFriends[data.sentBy].messageArray = [data];
        }
      }
    })
    this.getuserNames();
    this.getUserFriends();
    
  }
  getMessageArray(){
    return (this.userFriends[this.selectedChat].messageArray) 
    ? this.userFriends[this.selectedChat].messageArray : [];
  }
  getUserFriends() {
    var username = this.utilsService.getUserName();
    this.commonService.makeGetRequest(ApplicationURLs.getUserFriends, username).subscribe((res: any) => {
      this.userFriends = res.friends
      console.log(this.userFriends);
    })
  }

  getuserNames() {
    var username = this.utilsService.getUserName();
    this.commonService.makeGetRequest(ApplicationURLs.userInfo, username).subscribe((res) => {
      this.userNames = res
    })
  }

  userFriend69(user) {
    console.log(user.key)
    this.selectedChat = user.key;
  }

  closeSearchResults = () => {
    this.showSearchResults = false;
    this.search = '';
  }

  hideSideBar() {
    this.showSideBar = false
  }

  opensidebar() {
    this.showSideBar = true
  }

  goToProfile() {
    this.router.navigate(['/profile', {
      selfProfile: true,
      username: this.utilsService.getUserName()
    }])
  }

  goToSignOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  getuserinfo(username) {
    this.router.navigate(['/profile', {
      username: username,
      selfProfile: false
    }])
  }
  onSearch(search: string) {
    if (search.length <= 2) {
      this.showSearchResults = false;
      return;
    }
    this.showSearchResults = true;
    let body = {
      text: search
    }
    this.commonService.makePostRequest(ApplicationURLs.search, body).subscribe((res: any) => {
      this.resArrays = res.search_results

    })
  }
  
  isSelfUserName(sentBy){
              return sentBy === this.utilsService.getUserName()
              
  }

  scrollDivToBottom = (out) => {
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    if(isScrolledToBottom)
      out.scrollTop = out.scrollHeight - out.clientHeight;
  }

  sendMessages() {
    let messageParent:any = document.getElementById('message-parent');
    this.scrollDivToBottom(messageParent);

    let messageBody = {
      message: this.message,
      sentBy: this.utilsService.getUserName(),
      sentTo: this.selectedChat
    }
    this.socket.emit(this.utilsService.getUserName(), messageBody);
    if(this.userFriends[this.selectedChat].messageArray){
      this.userFriends[this.selectedChat].messageArray.push(messageBody);
    } else {
      this.userFriends[this.selectedChat].messageArray = [messageBody];
    }
    this.message = ''
  }
  connect = () => {

    this.socket = io.connect(BaseURL.url, {
      query: "tunnel=" + this.utilsService.getUserName()

    })
  }

}
