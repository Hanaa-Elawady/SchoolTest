import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent{
  constructor(private _BlankService: BlankService, private _Router: Router) {}
  msgError: string = '';
  isLoading: boolean = false;

  addStudent: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(010|015|011)[0-9]{8}$/),
    ])
    });

  handleForm(): void {
    this.isLoading = true;
    if (this.addStudent.valid) {
      this._BlankService.addStudent(this.addStudent.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this._Router.navigate(['student']);
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.addStudent.markAllAsTouched();
    }
  }
}
