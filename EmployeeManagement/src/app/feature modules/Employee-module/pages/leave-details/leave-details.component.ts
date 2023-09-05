import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/core/services/leave.service';
import { LeaveApplication } from 'src/app/core/interfaces/leaveapplication';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {

  public currentUser: any;

  public appliedLeaves: LeaveApplication[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private leaveService: LeaveService) {}

  // Function to get logged employee from local storage

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('employee') || '{}');
console.log(this.currentUser,'user for leave');

    if (this.currentUser && this.currentUser.id) {
      // Fetch the applied leave details of the current user
      this.fetchAppliedLeaves();
    }
  }

  // Function to get all leaves applied by that logged employee

  fetchAppliedLeaves() {
    this.leaveService.getAppliedLeavesByEmpId(this.currentUser.id).subscribe(
      appliedLeaves => {
        this.appliedLeaves = appliedLeaves;
        
      },  
      error => {
        console.log('Error fetching applied leaves:', error);
      }
    );
  }

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
