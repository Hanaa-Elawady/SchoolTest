import { AuthService } from './../../Shared/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  constructor(private _AuthService:AuthService, private _Router:Router) {}


   msgError:string='';
   isLoading:boolean = false;
 
   registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/),
    ]),
  
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/),
    ]),
  
    displayName: new FormControl('', [Validators.required]),
  
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(010|015|011)[0-9]{8}$/),
    ]),
  });
   
     handleForm():void{
       this.isLoading = true;
       if(this.registerForm.valid){
         this._AuthService.register(this.registerForm.value).subscribe({
           next:(response)=> {
               this.isLoading= false;  
               this._Router.navigate(['auth/login']);
           },
           error:(err)=>{
             this.msgError = err.error.message;
             this.isLoading= false;        
           }
         })
       }else{
         this.registerForm.markAllAsTouched();
       }
     }

}
