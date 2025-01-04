import { Subject } from './../../Shared/Interfaces/subject';
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

msgError: string = '';
isLoading: boolean = false;
data:any; 
AllSubjects :any ;


  ngOnInit(): void {
    this.getData();

  }


  getData():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let id:any = params.get('id');
        this.getStudentData(id);
      }
    })
  }

  getSubjects():void{
    this._BlankService.getAllSubjects().subscribe({
      next: (subjects)=>{
        const enrolledSubjectIds = this.data.subjects.map((subject: { subjectId: any; }) => subject.subjectId);

        this.AllSubjects = subjects.filter((subject: { id: any; }) => !enrolledSubjectIds.includes(subject.id));
      }
    })
  }

  addsubject(subject:any ):void{
    this.data.subjects.push({
      subjectId:subject.id,
      name:subject.name,
      grade:0,
    });

    this.AllSubjects = this.AllSubjects.filter((subjectToRemove: { id: any; }) => subjectToRemove.id != subject.id);
  }
  
  deleteSubject(subject:any ):void{
    
    this.data.subjects = this.data.subjects.filter((s: { subjectId: any }) => s.subjectId !== subject.subjectId);

    this.AllSubjects.push({
      id: subject.SubjectId,
      name: subject.name,
    });
  }

  getStudentData(id :any):void{
    this._BlankService.getStudentsById(id).subscribe({
      next:(response) => {
        this.data = response;
        this.getSubjects();
        this.updateForm();
      }
    })
  }

  check(e:any , id:any)
  {
    const subject = this.data.subjects.find((item: { subjectId: any; }) => item.subjectId == id);
    if (subject) {
      subject.grade = +e.target.value;
  }}


  updateForm():void{
    
    this.updateStudent.patchValue({
      id:this.data?.id,
      firstName: this.data?.firstName,
      lastName: this.data?.lastName,
      dateOfBirth: (() => {
        const date = new Date(this.data?.dateOfBirth);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
        })(),
      email: this.data?.email,
      address: this.data?.address,
      gender: this.data?.gender,
      phoneNumber: this.data?.phoneNumber,
      subjects: this.data?.subjects,
    });
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
    ]),
    subjects :new FormControl('' , [Validators.required]),
  });

  handleForm(): void {
    this.isLoading = true;
    console.log(this.updateStudent.valid)
    if (this.updateStudent.valid) {
      const subjectDto = this.updateStudent.value;
      subjectDto.id = this.data?.id;
      subjectDto.subjects = this.data?.subjects;
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

      console.log("NotValid Form")
    }
  }
}
