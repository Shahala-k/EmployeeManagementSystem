import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';


@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent  implements OnInit {

  constructor(private auth: ApiService) {}

  employeeUser:any;

  ngOnInit() {

 //  function to fetch the employee details from local storage
 
    const employeeUserData = localStorage.getItem('employee');
    if (employeeUserData) {
      this.employeeUser = JSON.parse(employeeUserData);
    }
  }
  
  // Function for logout

  logout(){
    // Remove employee from local storage
    localStorage.removeItem('employee');
    this.auth.logout();
  }
}
