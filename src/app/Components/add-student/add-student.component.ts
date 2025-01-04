import { Subject } from './../../Shared/Interfaces/subject';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit{
  constructor(private _BlankService: BlankService, private _Router: Router) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  msgError: string = '';
  isLoading: boolean = false;
  AllSubjects:any;
  subjectsAdded:any=[];


getSubjects():void{
this._BlankService.getAllSubjects().subscribe({
  next: (Subjects:any) => {
    this.AllSubjects = Subjects;
  }
})
}

EditGrade(e:any , id:any)
{
  const subject = this.subjectsAdded.find((item: { subjectId: any; }) => item.subjectId == id);
  if (subject) {
    subject.grade = +e.target.value;
}}

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


    
  addsubject(subject:any ):void{
    this.subjectsAdded.push({
      subjectId:subject.id,
      name:subject.name,
      grade:0,
    });

    this.AllSubjects = this.AllSubjects.filter((subjectToRemove: { id: any; }) => subjectToRemove.id != subject.id);
  }
  
  deleteSubject(subject:any ):void{
    
    this.subjectsAdded = this.subjectsAdded.filter((s: { subjectId: any }) => s.subjectId !== subject.subjectId);

    this.AllSubjects.push({
      id: subject.SubjectId,
      name: subject.name,
    });
  }

  handleForm(): void {
    this.isLoading = true;
    if (this.addStudent.valid) {
      var addedStudent = this.addStudent.value;
      addedStudent.subjects = this.subjectsAdded
      this._BlankService.addStudent(addedStudent).subscribe({
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
