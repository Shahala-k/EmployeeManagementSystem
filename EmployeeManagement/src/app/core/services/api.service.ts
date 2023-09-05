import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Employee } from '../interfaces/employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private http : HttpClient, private router: Router ) { }

  private apiUrl="http://localhost:3000/employees"


  // Api's For HR Dashboard

//api to get details of all employees

GetEmployees(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}


//api to add a new employee to the list

AddEmployee(employee: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, employee);
}


  //api to get Details of the employee with the id given

  ViewEmp(id :any):Observable<any>{
    return this.http.get(`http://localhost:3000/employees/${id}`)

  } 

//api to edit details of an employee

updateEmployee(employee: Employee) {
  const url = `${this.apiUrl}/${employee.id}`;
  return this.http.put(url, employee);
}

//api to delete a employee by its id

DeleteEmployee(employeeId: string): Observable<void> {
  const url = `${this.apiUrl}/${employeeId}`; 
  return this.http.delete<void>(url);
}

// Api for logout 

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['login']);
}

// Employee Dashboard //

// Api for update logged employee profile

updateEmpProfile(employeeId: string, updatedProfile: any): Observable<any> {
  const url = `${this.apiUrl}/${employeeId}`;
  return this.http.patch(url, updatedProfile);
}

}
