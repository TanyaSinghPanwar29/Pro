import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';
import { ApplicationURLs, EditDetailsURLs } from 'src/app/services/apiEnums';

@Component({
  selector: 'app-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.css']
})
export class DetailsEditComponent implements OnInit {
  DetailsEditForm: FormGroup;

  constructor( public commonService: CommonService) {
   
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
    console.log(this.DetailsEditForm.value)

    this.DetailsEditForm.markAllAsTouched();
    this.DetailsEditForm.markAsDirty();

    if(this.DetailsEditForm.invalid)
    return;

    let body={
      "first_Name" : this.DetailsEditForm.value.first_Name,
      "last_Name" :  this.DetailsEditForm.value.last_Name,
      "location":  this.DetailsEditForm.value.location,
      "description":  this.DetailsEditForm.value.description,
      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTIzIDA6MTA6NDQiLCJpYXQiOjE1OTU1Mjk2NDQsImV4cCI6MTU5NTUzMDI0NH0.pZs1nrOLuyGh8fFzOv4B71nbhiEJjhi8CMD4Hyck-mF9BJ9k0YaZoHK8aAluqWvnLaPYAT2WR5QFNfgsnZyTiEPWKcgLOp-ZOqF-eAYqZQHQAgChQnw_gSn6f8AzQQZRibrPZqLd7QancWqBmnU__fzjYG4wgvDjNzrMc1sLA50"
    }

    this.commonService.editDetails(EditDetailsURLs.EditDetails,body).subscribe(res =>{
      console.log(res)
    })
   
  }
  



}
