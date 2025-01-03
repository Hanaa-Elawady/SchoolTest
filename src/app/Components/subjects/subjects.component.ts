import { Component, OnInit } from '@angular/core';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit{
  constructor(private _BlankService:BlankService) { }
  data:any;
  ngOnInit(): void {
  this.getData(); 
  }


  getData():void {
    this._BlankService.getAllSubjects().subscribe({
      next:(response)=>{
        this.data = response;
      }
    })
  }

  delete(subjectId :string):void{
    this._BlankService.deleteSubject(subjectId).subscribe({
      next:(response)=>{
        if(response.message == "succeeded")
          this.getData();
      }
    })
  }
}
