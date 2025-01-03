import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent {
  constructor(private _BlankService: BlankService, private _Router: Router) {}
  msgError: string = '';
  isLoading: boolean = false;

  addSubject: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    creditHours: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
  });

  handleForm(): void {
    this.isLoading = true;
    if (this.addSubject.valid) {
      const subjectDto = this.addSubject.value;
      this._BlankService.addSubject(subjectDto).subscribe({
        next: (response) => {
          this.isLoading = false;
          this._Router.navigate(['subject']);
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.addSubject.markAllAsTouched();
    }
  }
}
