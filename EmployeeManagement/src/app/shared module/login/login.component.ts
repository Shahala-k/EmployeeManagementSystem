import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  private subscription: Subscription = new Subscription();

  username: string = '';
  password: string = '';

  constructor(private router: Router,private loginservice: LoginService ) {}
  
  // Function to login based on role

  onSubmit() {
    const username = this.username;
    const password = this.password;

    this.loginservice.getAdmin().subscribe(adminData => {
      const HRUser = adminData.find((user: any) => user.username === username && user.password === password);

      if (HRUser) {
        // Function to save HR login into local storage
        localStorage.setItem('HRuser', JSON.stringify(HRUser));
        console.log('Welcome HR', HRUser);
        this.username = '';
        this.password = '';
        this.router.navigate(['admin/dashboard']);

        // Display success SweetAlert notification
        Swal.fire({
          icon: 'success',
          text: 'HR logged in successfully!',
          timer:1000,
          confirmButtonText: 'OK'
        });
      } else {

        // Try login as an employee if not an HR
        this.loginservice.getEmployee().subscribe(employeeData => {
          const employeeUser = employeeData.find((user: any) => user.username === username && user.password === password);
        // Function to block login of inactive employee
          if (employeeUser) {
            if (employeeUser.status === 'inactive') {
              // Display a  SweetAlert notification for inactive employee
              Swal.fire({
                icon: 'error',
                title:'Please Contact HR',
                text: 'You are an inactive employee so cannot log in.',
                timer:1500,
                confirmButtonText: 'OK'
              });
              return; // Stop further execution
            }

// Function to save that employee into local storage

            localStorage.setItem('employee', JSON.stringify(employeeUser));
            console.log('Welcome employee', employeeUser);
            this.username = '';
            this.password = '';
            this.router.navigate(['employee/details']);

            // Display success SweetAlert notification
            Swal.fire({
              icon: 'success',
              text: 'Employee logged in successfully!',
              timer:1000,
              confirmButtonText: 'OK'
            });
          } else {
            // Display error SweetAlert notification for invalid credentials
            Swal.fire({
              icon: 'error',
              text: 'Invalid login credentials. Please try again.',
              timer:1000,
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
