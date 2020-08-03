import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';
import { ApplicationURLs } from 'src/app/services/apiEnums';
import { UtilsService } from 'src/app/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validator } from 'src/app/validator-util';


@Component({
  selector: 'app-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.css']
})
export class DetailsEditComponent implements OnInit {
  DetailsEditForm: FormGroup;
  screenParameters: any;
  validator: Validator = new Validator();
  constructor( public commonService: CommonService , private utilsService : UtilsService, private route: ActivatedRoute, private router: Router) {
     
   }

  ngOnInit(): void {
    this.route.params.subscribe(res =>{
      this.screenParameters = res;
      console.log(this.screenParameters)
    })
    this.formdetails()
  }
  
  formdetails = () => {
    this.utilsService.getEmail();
    this.DetailsEditForm = new FormGroup({
      "first_Name" : new FormControl('',[Validators.required, Validators.minLength(this.validator.minLengths.nameLength)]),
      "last_Name" : new FormControl('',[Validators.required,  Validators.minLength(this.validator.minLengths.nameLength)]),
      "email": new FormControl(this.utilsService.getEmail(),Validators.required),
      "location": new FormControl('',Validators.required),
      "description": new FormControl('',Validators.required)
    });
    this.DetailsEditForm.controls["email"].disable();
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
      // "token": this.utilsService.getToken(),
      "username": this.utilsService.getUserName()
    }
  
      this.commonService.makePostRequest(ApplicationURLs.EditDetails ,body).subscribe(res =>{
      console.log(res)
      this.router.navigate(['/textmsg'])
    })

  
   
  }
  



}
