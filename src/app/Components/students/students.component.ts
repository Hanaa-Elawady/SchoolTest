import { Component } from '@angular/core';
import { Subject } from 'src/app/Shared/Interfaces/subject';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  constructor(private _BlankService:BlankService) { }
  students:any;
  subjects:Subject[] = [];
  ngOnInit(): void {
    this.getData();
  }

  getData():void {
    this._BlankService.getAllStudents().subscribe({
      next:(response)=>{
        this.students = response;
      }
    });
    this._BlankService.getAllSubjects().subscribe({
      next:(response)=>{
        this.subjects = response;
      }
    })
  }

      mapSubjects(subid: any): string {
        const subject = this.subjects.find(sub => sub.id === subid);
        return subject ? subject.name : 'Unknown Subject';
      }
    

  delete(subjectId :string):void{
    this._BlankService.deleteStudent(subjectId).subscribe({
      next:(response)=>{
        if(response.message == "succeeded")
          this.getData();
      }
    })
  }
}
