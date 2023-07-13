import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

const primeng = [
  InputTextModule,
  DropdownModule,
  InputTextareaModule,
  ButtonModule,
] as const;

type Payload = ReturnType<typeof AppComponent.prototype.form.getRawValue>;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primeng],
  selector: 'contact-blog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent implements OnInit {
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #fb = inject(FormBuilder);
  @Output() submitForm = new EventEmitter<Payload>();
  readonly concerns = [
    'General',
    'Workshop',
    'Freelancing',
    'Code Review',
    'Other',
  ];

  readonly form = this.#fb.group({
    concern: this.#fb.control<string | null>(null, [Validators.required]),
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(30)]],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() =>this.#cdr.detectChanges());
  }

  submit() {
    const { concern, name, email, company, subject, message } =
      this.form.getRawValue();
    if (concern && name && email && subject && message) {
      this.submitForm.emit({
        concern,
        name,
        email,
        company,
        subject,
        message,
      });
    }
  }
}
