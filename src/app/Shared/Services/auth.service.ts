import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private _HttpClient:HttpClient ,private _Router:Router) { }

  saveUserData(): void {
    const token = localStorage.getItem('eToken');
    if (token) {
      this.userData = jwtDecode(token);
    }
  }
  
  register(userData :object): Observable<any> {
    const url = `https://localhost:7110/api/Auth/Register`;
      return this._HttpClient.post(url,userData);;
  }

  login(userData:object): Observable<any> {
    const url = `https://localhost:7110/api/Auth/Login`;
    return this._HttpClient.post(url,userData);;
  }
  
  logOut():void{
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login'])
  }
}
function jwtDecode(encodedToken: string) {
    try {
      const decodedPayload = atob(encodedToken.split('.')[1]);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload;
    } catch (error) {
      console.error('Failed to decode custom token:', error);
      return null;
    }
  }
  

  


