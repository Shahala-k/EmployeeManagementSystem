import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { EmpListComponent } from './pages/emp-list/emp-list.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EmpAddComponent } from './pages/emp-add/emp-add.component';
import { EmpDetailsComponent } from './pages/emp-details/emp-details.component';
import { HrDashboardComponent } from './pages/hr-dashboard/hr-dashboard.component';
import { DoughnutChartComponent } from './pages/doughnut-chart/doughnut-chart.component';
import { EmpLeaveComponent } from './pages/emp-leave/emp-leave.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { GenderSalutationPipe } from 'src/app/core/pipes/gender-salutation.pipe';


@NgModule({
  declarations: [
    EmpListComponent,
    AdminPageComponent,
    EmpAddComponent,
    EmpDetailsComponent,
    HrDashboardComponent,
    DoughnutChartComponent,
    EmpLeaveComponent,
    GenderSalutationPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule
    
  ]
})
export class AdminModule { }
