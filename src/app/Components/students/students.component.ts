import { Component } from '@angular/core';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  constructor(private _BlankService:BlankService) { }
  students:any;

  ngOnInit(): void {
    this.getData();
  }

  getData():void {
    this._BlankService.getAllStudents().subscribe({
      next:(response)=>{
        this.students = response;
      }
    });
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
