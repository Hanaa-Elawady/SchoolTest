import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentsComponent } from './Components/students/students.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { NavAuthComponent } from './Components/nav-auth/nav-auth.component';
import { NavBlankComponent } from './Components/nav-blank/nav-blank.component';
import { BlankLayoutComponent } from './Components/blank-layout/blank-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStudentComponent } from './Components/add-student/add-student.component';
import { AddSubjectComponent } from './Components/add-subject/add-subject.component';
import { UpdateSubjectComponent } from './Components/update-subject/update-subject.component';
import { UpdateStudentComponent } from './Components/update-student/update-student.component';
import { MyhttpInterceptor } from './Shared/Interceptors/myhttp.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    StudentsComponent,
    SubjectsComponent,
    NotFoundPageComponent,
    HomeComponent,
    AuthLayoutComponent,
    NavAuthComponent,
    NavBlankComponent,
    BlankLayoutComponent,
    AddStudentComponent,
    AddSubjectComponent,
    UpdateSubjectComponent,
    UpdateStudentComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyhttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
