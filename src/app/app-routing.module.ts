import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Shared/Guard/auth.guard';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { StudentsComponent } from './Components/students/students.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { AddSubjectComponent } from './Components/add-subject/add-subject.component';
import { UpdateStudentComponent } from './Components/update-student/update-student.component';
import { UpdateSubjectComponent } from './Components/update-subject/update-subject.component';

const routes: Routes = [
  {path: "",
    canActivate:[authGuard],
    component: BlankLayoutComponent, children:[
      {path:'' , redirectTo:"home" , pathMatch: "full"},
      {path:'home' , component:HomeComponent , title:"home"},
      {path:'student' , component:StudentsComponent , title:"students"},
      {path:'subject' , component:SubjectsComponent , title:"subjects"},
      {path:'AddStudent' , component:AddStudentComponent , title:"AddStudent"},
      {path:'AddSubject' , component:AddSubjectComponent , title:"AddSubject"},
      {path:'UpdateStudent/:id' , component:UpdateStudentComponent , title:"UpdateStudent"},
      {path:'UpdateSubject/:id' , component:UpdateSubjectComponent , title:"UpdateSubject"} 
    ]
  },

  { path: '',component:AuthLayoutComponent ,children:[
    { path: '', redirectTo:"register", pathMatch: "full" },
    { path: "register", component:RegisterComponent , title:'Register' },
    { path: "login", component:LoginComponent , title:"Login" }
  ]},

  { path: "**", component:NotFoundPageComponent , title: "NotFound" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
