import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './core/services/api.service'; 
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonInterceptor } from './core/interceptor/common.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './feature modules/Admin-module/admin.module';
import { LoginComponent } from './shared module/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { EmployeeModuleRoutingModule } from './feature modules/Employee-module/employee-module-routing.module';
import { EmployeeModuleModule } from './feature modules/Employee-module/employee-module.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    EmployeeModuleModule,
    BrowserAnimationsModule,
    EmployeeModuleRoutingModule
   

  ],
  providers: [[ApiService,{provide:HTTP_INTERCEPTORS,useClass:CommonInterceptor, multi:true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
