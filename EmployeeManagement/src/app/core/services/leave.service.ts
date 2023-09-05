import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveApplication } from '../interfaces/leaveapplication';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/leaves'; 


//Api to get all leave details

GetAllLeaves(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

// api to apply for a leave

  applyForLeave(leaveData: any): Observable<LeaveApplication> {
    return this.http.post<LeaveApplication>(this.apiUrl, leaveData);
  }

 // Fetch applied leave details for the log-in employee

 getAppliedLeavesByEmpId(employeeId: string): Observable<any[]> {
  const url = `${this.apiUrl}?employeeId=${employeeId}`;
  return this.http.get<any[]>(url);
}

// Api to Update leave status of employee

updateLeaveStatus(leaveId: number, status: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${leaveId}`, { status });
}

}
