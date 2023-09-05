import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDashboardComponent } from './pages/emp-dashboard/emp-dashboard.component';
import { EmpDetailComponent } from './pages/emp-detail/emp-detail.component';
import { LeaveApplicationComponent } from './pages/leave-application/leave-application.component'; 
import { LeaveDetailsComponent } from './pages/leave-details/leave-details.component';
import { EmpProfileEditComponent } from './pages/emp-profile-edit/emp-profile-edit.component'; 
import { EmpAuthGuard } from 'src/app/core/guards/emp.guard';

const routes: Routes = [
  {
    path: 'employee', component: EmpDashboardComponent,canActivate:[EmpAuthGuard],
    children: [
      { path: 'details', component: EmpDetailComponent },
      { path: 'profile-edit', component: EmpProfileEditComponent}, 
      { path: 'leave', component: LeaveApplicationComponent },
      { path: 'empleaves', component: LeaveDetailsComponent },
      { path: '', redirectTo: 'employee/details', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeModuleRoutingModule { }
