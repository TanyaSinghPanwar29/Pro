import { FormControl, Form } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService';

// export class password{
//     constructor(private commonService: CommonService){
//       this.commonService.userPassword.subscribe((password)=>{
//           console.log(password)
//       })
//     }
// }
export class Validator{
     emailRegex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     errorMessages = {
         email: {
             required: "Email is required",
             incorrect: "Email is incorrect"
         },
         password:{
            required: "Password is required",
            incorrect: "Password is incorrect",
            notAMatch: "Passwords does'nt match."
         },
         name:{
             required:"Name is required",
             short: "Name is too short"
         },
         location:{
             required: "Location is required",
         }

        }
     minLengths = {
         password: 6,
         phone: 1000000000,
         nameLength: 3
     }

     getErrorMessage = (control,type: string)=>{
        switch(type){
            case 'email':
               return this.getEmailErrorMessage(control);
            case 'password':
                return this.getPasswordErrorMessage(control);  
            case 'name':
                return this.getNameErrorMessage(control); 
            case 'location':
                return this.getLocaltionErrorMessage(control);      
        }
    }

    getLocaltionErrorMessage = (control: FormControl ) =>{
        let value = control.value;
         if((control.touched || control.dirty) && !value && control.invalid){
             return this.errorMessages.location.required;
         }
    }
    getNameErrorMessage = (control: FormControl)=>{
        let value = control.value;
        if((control.touched || control.dirty) && !value && control.invalid){
            return this.errorMessages.name.required;
        }
        if((control.touched || control.dirty) && value && value.toString().length <= this.minLengths.nameLength){
            return this.errorMessages.name.short;
        }
        
    }
    getEmailErrorMessage = (control: FormControl)=>{
        let value = control.value;
        if((control.touched || control.dirty) && !value && control.invalid){
            return this.errorMessages.email.required;
        }
        if((control.touched || control.dirty) && value && control.invalid){
            return this.errorMessages.email.incorrect;
        }
    }
    getConfirmPasswordErrorMessage = (password,confirmPassword) =>{
        let value = confirmPassword.value;
        if((confirmPassword.touched || confirmPassword.dirty) && !value && confirmPassword.invalid){
            return this.errorMessages.password.required;
        }

        if((confirmPassword.touched || confirmPassword.dirty) && (value !== password.value) && confirmPassword.invalid){
            return this.errorMessages.password.notAMatch;
        }

        if((confirmPassword.touched || confirmPassword.dirty) && value && confirmPassword.invalid){
            return this.errorMessages.password.incorrect;
        }

        
    }
    getPasswordErrorMessage = (control: FormControl) =>{
        let value = control.value;
        if((control.touched || control.dirty) && !value && control.invalid){
            return this.errorMessages.password.required;
        }
        if((control.touched || control.dirty) && value && control.invalid){
            return this.errorMessages.password.incorrect;
        }

        
    }
}