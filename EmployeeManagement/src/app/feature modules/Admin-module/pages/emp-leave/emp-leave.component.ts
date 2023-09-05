import { Component,OnInit } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';
import { LeaveApplication } from 'src/app/core/interfaces/leaveapplication';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.scss']
})
export class EmpLeaveComponent implements OnInit {

  leaves: LeaveApplication[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private leaveService: LeaveService) {}

  // Function  initialization

  ngOnInit(): void {
    this.LeaveApplications();
  }

  // Function to get all leaves applications of employees

  LeaveApplications() {
    this.leaveService.GetAllLeaves().subscribe(applications => {
        this.leaves = applications;
      },
      error => {
        console.error('Error fetching leave applications:', error);
      }
    );
  }

    // Function to approve leave

  approveLeave(application: LeaveApplication) {
    this.updateLeaveStatus(application, 'Approved');
  }
    // Function to reject leave

  rejectLeave(application: LeaveApplication) {
    this.updateLeaveStatus(application, 'Rejected');
  }

  // Function to update leave status of employee

  updateLeaveStatus(application: LeaveApplication, status: string) {
    this.leaveService.updateLeaveStatus(application.id, status).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Leave application ${status.toLowerCase()}`,
          confirmButtonText: 'OK',
          timer:1000
        });
        // Update the status locally
        application.status = status;
      },
      error => {
        console.error(`Error updating leave status to ${status.toLowerCase()}:`, error);
      }
    );
  }

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}































