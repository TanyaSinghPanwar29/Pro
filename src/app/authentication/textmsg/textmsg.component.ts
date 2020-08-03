import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { BaseURL, ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';
import { CommonService } from 'src/app/services/commonService';
@Component({
  selector: 'app-textmsg',
  templateUrl: './textmsg.component.html',
  styleUrls: ['./textmsg.component.css']
})
export class TextmsgComponent implements OnInit {
  public socket; 
  search : string;
  showSearchResults : boolean = false;
  constructor(private utilsService: UtilsService,private commonService: CommonService) { 
    this.connect();
  }
  message: string;
  messageArray = [];
  resArrays;
  ngOnInit(): void {
    this.socket.on(this.utilsService.getEmail(),(data) => {
      console.log(data)
      this.messageArray.push(data.message);

    })
}

onSearch(search: string){
  if(search.length <= 2){
    this.showSearchResults = false;
    return;
  }
  this.showSearchResults = true;
  let body={
    text: search
  }
    this.commonService.makePostRequest(ApplicationURLs.search,body).subscribe((res:any) =>{
      console.log(res.search_results)
      this.resArrays = res.search_results
      console.log(this.resArrays)
    })
}


  sendMessages(){
    this.socket.emit(this.utilsService.getEmail(),{
      message: this.message,
      sentBy: this.utilsService.getEmail(),
      sentTo: "efg@gmail.com"
    })
    this.messageArray.push(this.message)
    this.message=''
  }
  connect = () => {
       
       this.socket = io.connect(BaseURL.url,{
         query:"tunnel="+this.utilsService.getEmail()
         
       })
  }

}
