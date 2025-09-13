import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-forgotpassword',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
   isLoding: boolean = false;
  step:number=1
  ngOnInit(): void {
    this.initform();
  }
  initform(): void {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });


       this.verifyCode = this.fb.group({
    
       resetCode: [null, [Validators.required, Validators.pattern(/^\w{4,}$/)]],
    });

    this.resetPassword = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
    
  }

  FormStep1():void{
  if (this.verifyEmail.valid) {
       this.authService.submitverifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
  this.step=2
      }
    })
  }
  }

    FormStep2():void{
  if (this.verifyCode.valid) {
       this.authService.submitverifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
  this.step=3
      }
    })
  }
  }
      FormStep3():void{
  if (this.resetPassword.valid) {
    this.isLoding=true
       this.authService.submitresetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.cookieService.set('token',res.token)
        
     setTimeout(() => {
                this.router.navigate(['/home']);
                 this.isLoding=false
              }, 500);
      }
    })
  }
  }
}
