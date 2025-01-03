import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent {
constructor(private _BlankService: BlankService,private _ActivatedRoute:ActivatedRoute , private _Router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  msgError: string = '';
  isLoading: boolean = false;
  data:any; 

  getData():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let id:any = params.get('id');
        this._BlankService.getStudentsById(id).subscribe({
          next:(response) => {
            this.data = response;
            this.updateStudent.patchValue({
              id:this.data.id,
              firstName: this.data?.firstName,
              lastName: this.data?.lastName,
              dateOfBirth: (() => {
                const date = new Date(this.data?.dateOfBirth);
                date.setDate(date.getDate() + 1);
                return date.toISOString().split('T')[0];
                })(),
              gender: this.data?.gender,
              address: this.data?.address,
              email: this.data?.email,
              phoneNumber: this.data?.phoneNumber,
          });
          }
        })
      }
  })
}

  updateStudent: FormGroup = new FormGroup({
    id: new FormControl('' ,[Validators.required]),
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
    if (this.updateStudent.valid) {
      const subjectDto = this.updateStudent.value;
      subjectDto.id = this.data?.id;
      this._BlankService.updateStudent(subjectDto).subscribe({
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
      this.updateStudent.markAllAsTouched();
    }
  }
}
