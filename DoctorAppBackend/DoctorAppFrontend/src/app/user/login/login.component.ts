import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SharedService } from '../../shared/shared.service';
import { Login } from '../Interfaces/Login' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    formLogin : FormGroup;
    hiddenPassword : boolean = true;
    showLoading : boolean = false;

    constructor
    (
      private fb: FormBuilder,
      private router : Router,
      private userService : UserService,
      private sharedService : SharedService
    )
    {
      this.formLogin = this.fb.group({
        email : ['',Validators.required],
        password:['',Validators.required]
      });
      
    } 

    LoginSesion() {
      this.showLoading = true;
      const request: Login = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      };
      this.userService.login(request).subscribe({

         next:(response)=>{
            this.sharedService.saveSection(response);
            this.router.navigate(['layout']);
         },

         complete: () =>{ 
          this.showLoading = false;
        },

         error: (error) => {
          this.sharedService.openSnackBar(error.error,"Login Error");
          this.showLoading = false;
         }
      });
    }

}