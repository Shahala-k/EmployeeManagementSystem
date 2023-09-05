import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss']
})
export class EmpDetailComponent implements OnInit {

  employeeUser: any;

  //  Function to Fetch the logged  employee details from local storage

  ngOnInit() {
    const employeeUserData = localStorage.getItem('employee');
    if (employeeUserData) {
      this.employeeUser = JSON.parse(employeeUserData);
    }
  }
}