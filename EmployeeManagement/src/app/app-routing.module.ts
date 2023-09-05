import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard'; 
import { LoginComponent } from './shared module/login/login.component'; 
import { EmpAuthGuard } from './core/guards/emp.guard';


const routes: Routes = [
  {path:'',redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path: 'admin', loadChildren: () => import('./feature modules/Admin-module/admin.module').then((m) => m.AdminModule),canActivate:[AdminGuard]},
  {path: 'employee', loadChildren: () => import('./feature modules/Employee-module/employee-module.module').then((m) => m.EmployeeModuleModule),canActivate:[EmpAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
