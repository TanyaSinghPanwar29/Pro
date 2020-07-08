import { FormControl, Form } from '@angular/forms';

export class Validator{
     emailRegex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     errorMessages = {
         email: {
             required: "Email is required",
             incorrect: "Email is incorrect"
         },
         password:{
            required: "Password is required",
            incorrect: "Password is incorrect"
         }
        }
     minLengths = {
         password: 6,
         phone: 1000000000

     }
     getErrorMessage = (control,type: string)=>{
        switch(type){
            case 'email':
               return this.getEmailErrorMessage(control);
            case 'password':
                return this.getPasswordErrorMessage(control);   
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