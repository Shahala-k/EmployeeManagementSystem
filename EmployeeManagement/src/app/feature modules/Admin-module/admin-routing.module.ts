import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EmpListComponent } from './pages/emp-list/emp-list.component';
import { EmpAddComponent } from './pages/emp-add/emp-add.component'; 
import { HrDashboardComponent } from './pages/hr-dashboard/hr-dashboard.component';
import { EmpLeaveComponent } from './pages/emp-leave/emp-leave.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  
  { path: 'admin', component:AdminPageComponent,canActivate:[AdminGuard],
   children:[
    {path: 'emp-list', component:EmpListComponent},
    {path: 'emp-add', component:EmpAddComponent},
    {path: 'emp-leave', component:EmpLeaveComponent},
    {path:'dashboard',component:HrDashboardComponent},
    {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'}
   ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
