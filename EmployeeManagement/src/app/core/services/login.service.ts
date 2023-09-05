import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient ) { }

  HrUrl = "http://localhost:3000/admin";
  empUrl ='http://localhost:3000/employees';


  getAdmin(){
    return this.http.get<any>(this.HrUrl);
  }
  
  getEmployee(){
    return this.http.get<any>(this.empUrl);
  }
}
