import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlankService } from 'src/app/Shared/Services/blank.service';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit{
constructor(private _BlankService: BlankService,private _ActivatedRoute:ActivatedRoute , private _Router: Router) {}
data:any; 

  ngOnInit(): void {
    this.getData();
  }

  getData():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let id:any = params.get('id');
        console.log(id);  
        this._BlankService.getSubjectsById(id).subscribe({
          next:(response) => {
            this.data = response;

            this.updateSubject.patchValue({
              id:this.data.id,
              name: this.data.name,
              creditHours: this.data.creditHours,
              description: this.data.description,
            })
          }
        })
      }
  })
}
  msgError: string = '';
  isLoading: boolean = false;

  updateSubject: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    creditHours: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
  });

  handleForm(): void {
    this.isLoading = true;
    this.updateSubject.value.id = this.data.id;
    if (this.updateSubject.valid) {
      const subjectDto = this.updateSubject.value;
      this._BlankService.updateSubject(subjectDto).subscribe({
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
      this.updateSubject.markAllAsTouched();
    }
  }
}
