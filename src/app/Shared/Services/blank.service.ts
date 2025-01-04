import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlankService {

  baseUrl:string = `https://localhost:7110/api`;
  
  constructor(private _HttpClient:HttpClient) { }

  getAllSubjects():Observable<any>{
    const url = `${this.baseUrl}/Subject/GetAllSubjects`;
    return this._HttpClient.get(url);
  }

  getSubjectsById(Id:string):Observable<any>{
    const url = `${this.baseUrl}/Subject/GetSubjectById?id=${Id}`;
    return this._HttpClient.get(url);
  }

  addSubject(subjectData:object):Observable<any>{
    const url = `${this.baseUrl}/Subject/AddSubject`;
    return this._HttpClient.post(url ,subjectData);
  }

  updateSubject(subjectData:object):Observable<any>{
    const url = `${this.baseUrl}/Subject/UpdateSubject`;
    return this._HttpClient.post(url ,subjectData);
  }

  deleteSubject(subjectId:string):Observable<any>{
    const url = `${this.baseUrl}/Subject/DeleteSubject?subjectId=${subjectId}`;
    return this._HttpClient.delete(url);
  }

  getAllStudents():Observable<any>{
    const url = `${this.baseUrl}/Student/GetAllStudents`;
    return this._HttpClient.get(url);
  }

  getStudentsById(Id:string):Observable<any>{
    const url = `${this.baseUrl}/Student/GetStudentById?id=${Id}`;
    return this._HttpClient.get(url);
  }

  addStudent(StudentData:object):Observable<any>{
    console.log(StudentData);
    const url = `${this.baseUrl}/Student/AddStudent`;
    return this._HttpClient.post(url ,StudentData);
  }

  addStudentSubject(StudentId:string , subjectId:string):Observable<any>{
    const url = `${this.baseUrl}/Student/AddSubjectToStudent?studentId=${StudentId}&subjectId=${subjectId}`;
    return this._HttpClient.post(url, "");
  }

  updateStudent(StudentData:object):Observable<any>{
    console.log(StudentData);
    const url = `${this.baseUrl}/Student/UpdateStudent`;
    return this._HttpClient.post(url ,StudentData);
  }

  deleteStudent(StudentId:string):Observable<any>{
    const url = `${this.baseUrl}/Student/DeleteStudent?StudentId=${StudentId}`;
    return this._HttpClient.delete(url);
  }
}
