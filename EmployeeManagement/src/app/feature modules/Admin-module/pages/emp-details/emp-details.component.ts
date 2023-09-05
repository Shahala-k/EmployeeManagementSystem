import { Component,Inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Employee } from 'src/app/core/interfaces/employee'; 
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})

export class EmpDetailsComponent   {

  public value : any
  selectedEmployee: Employee | undefined;

  private subscription: Subscription = new Subscription();


  constructor(  private apiservice: ApiService, @Inject(MAT_DIALOG_DATA) public employee : any ) {}

// Function to get details of employee by its Id

  empDetail(employeeId: number) {
    this.apiservice.GetEmployees().subscribe((res) => {
      this.value = res;
      console.log(this.value);
      this.selectedEmployee = this.value.find((e:any) => e.id === employeeId);
    });
  }
  
// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}



  