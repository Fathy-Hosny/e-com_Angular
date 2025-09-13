import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  isLoding: boolean = false;
  msgErro: string = '';
  Subscription: Subscription = new Subscription();
  loginform!: FormGroup;
  ngOnInit(): void {
    this.initform();
  }
  initform(): void {
    this.loginform = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  SubmitForm(): void {
    if (this.loginform.valid) {
      this.isLoding = true;
      this.Subscription.unsubscribe();
      this.Subscription = this.authService
        .loginForm(this.loginform.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              this.cookieService.set('token', res.token);

              console.log(this.authService.decodetoken());

              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 500);
            }

            this.isLoding = false;
          },
          error: (err) => {
            this.msgErro = err.error.message;

            this.isLoding = false;
          },
        });
    }else {
      
      this.loginform.markAllAsTouched();
    }
  }

  
}
