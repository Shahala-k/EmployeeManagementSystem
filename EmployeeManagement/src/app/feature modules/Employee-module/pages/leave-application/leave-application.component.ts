import { Component } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
   
@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})

export class LeaveApplicationComponent  {

  leaveType: string = '';
  startDate: Date | undefined;
  endDate: Date | undefined;
  reason: string = '';
  status: string = 'Pending';

  private subscription: Subscription = new Subscription();

  constructor(private leaveService: LeaveService) {}

  onSubmit() {
    const employeeUserData = localStorage.getItem('employee');
    if (employeeUserData) {
          // Function to get employee name and id from local storage
      const employeeUser = JSON.parse(employeeUserData);
      const employeeName = employeeUser.name;
      const employeeId = employeeUser.id;

      const leaveApplication = {
        employeeId: employeeId,
        employeeName: employeeName, 
        leaveType: this.leaveType,
        startDate: this.startDate,
        endDate: this.endDate,
        reason: this.reason,
        status: this.status
      };
// Function to apply for a leave

      this.leaveService.applyForLeave(leaveApplication).subscribe(
        response => {
          // Display success SweetAlert notification
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Leave applied successfully',
            confirmButtonText: 'OK'
          }).then(() => {
            // For resetting form after leave submission
            this.leaveType = '';
            this.startDate = undefined;
            this.endDate = undefined;
            this.reason = '';
          });
        },
        error => {
          console.log('Error submitting leave application', error);
        }
      );
    }
  }

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
