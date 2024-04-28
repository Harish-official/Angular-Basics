import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { map, pairwise } from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss',
})
export class ReactiveFormsComponent {
  studentForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    // Reactive Forms
    this.studentForm = this.formBuilder.group({
      grade: [''], // By default the value inside array is considered as form control's value
      name: ['', Validators.required], // Syntax for adding single Validation with form control
      age: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Syntax for adding multiple Validations with form control
      email: [{ value: null, disabled: true }], // Syntax for disabling the form control by default
    });
  }

  ngOnInit(): void {
    //Triggered when the Age Control Changes
    this.studentForm.get('age')?.statusChanges.subscribe((_res) => {
      console.log('Age status changed to:', _res);
      if (_res === 'VALID') this.studentForm.controls['email'].enable();
      else this.studentForm.controls['email'].disable();
    });

    // Triggered when the Email Control Changes
    this.studentForm
      .get('email')
      ?.valueChanges.pipe(
        map((value: string) => value?.toLowerCase()), // Pipe transforms the data before subscribing it's values in the desired format
        pairwise() // pairwise is used when you require previous value to compare with current value
      )
      .subscribe(([prev, curr]) => {
        console.log(`Email value changed from ${prev} to: ${curr}`);
      });
  }

  onStudentFormSubmit(_event: any): void {
    // console.this to check the current representation of Student Form Data
    this.studentForm;
  }

  // Functions that is used for Validation of a Form Control and return true if there is any Error.
  validateStudentFormRequired(key: string): boolean {
    const control = this.studentForm.get(key);
    return Boolean(control?.touched && control?.errors?.['required']);
  }

  validateStudentFormPattern(key: string): boolean {
    const control = this.studentForm.get(key);
    return Boolean(control?.touched && control?.errors?.['pattern']);
  }
}
