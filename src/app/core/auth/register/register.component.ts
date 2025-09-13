import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, InputComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  isLoding: boolean = false;
  msgErro: string = '';

  regesterform!: FormGroup;

  ngOnInit(): void {
    this.initform();
  }
  initform(): void {
    this.regesterform = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],

        password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
        rePassword: [
          null,
          [Validators.required],
        ],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[125][0-9]{8}$/)],
        ],
      },
      { validators: this.conFirmpassword }
    );
  }

  conFirmpassword(groub: AbstractControl) {
    if (groub.get('password')?.value === groub.get('rePassword')?.value) {
      return null;
    } else {
      groub.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  SubmitForm(): void {
    if (this.regesterform.valid) {
      this.isLoding = true;
      this.authService.registerForm(this.regesterform.value).subscribe({
        next: (res) => {
          console.log(res.message);
          if (res.message == 'success') {
            this.msgErro = '';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }

          this.isLoding = false;
        },
        error: (err) => {
          this.msgErro = err.error.message;

          this.isLoding = false;
        },
      });
    } else {
      this.regesterform.get('rePassword')?.patchValue('');
      this.regesterform.markAllAsTouched();
    }
  }
}
