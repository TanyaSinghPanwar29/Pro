import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';
import { ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.css']
})
export class DetailsEditComponent implements OnInit {
  DetailsEditForm: FormGroup;

  constructor( public commonService: CommonService , private utilsService : UtilsService) {
   
   }

  ngOnInit(): void {
    this.formdetails()
  }

  formdetails = () => {
    this.DetailsEditForm = new FormGroup({
      "first_Name" : new FormControl('',[Validators.required, Validators.minLength(5)]),
      "last_Name" : new FormControl('',Validators.required),
      "location": new FormControl('',Validators.required),
      "description": new FormControl('',Validators.required),
    });
    console.log(this.DetailsEditForm)
  }
  onEditDetails(){
   

    this.DetailsEditForm.markAllAsTouched();
    this.DetailsEditForm.markAsDirty();

    if(this.DetailsEditForm.invalid)
    return;

    let body={
      "first_Name" : this.DetailsEditForm.value.first_Name,
      "last_Name" :  this.DetailsEditForm.value.last_Name,
      "location":  this.DetailsEditForm.value.location,
      "description":  this.DetailsEditForm.value.description,
      "token": this.utilsService.getToken()
    }
  
      this.commonService.makePostRequest(ApplicationURLs.EditDetails ,body).subscribe(res =>{
      console.log(res)
    })

  
   
  }
  



}
