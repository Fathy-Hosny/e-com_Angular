import { url } from 'inspector';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
private readonly fb = inject(FormBuilder);
private readonly toastrService = inject(ToastrService);
  ContactForm!: FormGroup;




  ngOnInit(): void {
    this.iniyfrom();

  }


  iniyfrom(): void {
  this.ContactForm = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[125][0-9]{8}$/)],
    ],
    topic: [null, [Validators.required]],
    massage: [null, [Validators.required, Validators.minLength(10)]],
    terms: [false, [Validators.requiredTrue]],
  });
}




}
