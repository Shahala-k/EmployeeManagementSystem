import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeModuleRoutingModule } from './employee-module-routing.module';

import { EmpDashboardComponent } from './pages/emp-dashboard/emp-dashboard.component';
import { EmpDetailComponent } from './pages/emp-detail/emp-detail.component';
import { EmpProfileEditComponent } from './pages/emp-profile-edit/emp-profile-edit.component';
import { LeaveApplicationComponent } from './pages/leave-application/leave-application.component';
import { LeaveDetailsComponent } from './pages/leave-details/leave-details.component';

@NgModule({
  declarations: [
    EmpDashboardComponent,
    EmpDetailComponent,
    LeaveApplicationComponent,
    LeaveDetailsComponent,
    EmpProfileEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class EmployeeModuleModule { }
