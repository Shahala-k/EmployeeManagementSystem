import { Component,ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.scss']
})
export class EmpAddComponent {

  @ViewChild('employeeForm', { static: false })
  
  employeeForm!: NgForm;

  private subscription: Subscription = new Subscription();

  selectedImage: File | null = null;
  id!:string;
  name!: string;
  age!: number;
  dob!: string;
  image!: string;
  bloodGroup!: string;
  gender!: string;
  email!: string;
  mobileNumber!: string;
  leaves!: number;
  position!: string;
  package!: string;
  status!: string;

  constructor(private apiService: ApiService, private router: Router) {}


  // Function to handle image

  handleFileInput(event: any) {
    if (event.target.files && event.target.files.length > 0) {
        this.selectedImage = event.target.files[0];
    }
}

getImageUrl(): string | null {
  if (this.selectedImage) {
      return URL.createObjectURL(this.selectedImage);
  }
  return null;
}

// Function to add a  new employee

onSubmit(newEmployee: any) {
  console.log(newEmployee);
  this.apiService.AddEmployee(newEmployee).subscribe(
      (res) => {
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'New Employee added successfully.',
              showConfirmButton: false,
              timer: 1000
          }).then(() => {
            this.resetForm();
              this.router.navigate(['../emp-list']); // Redirect to employee list page
          });
      },
      (error) => {
          console.error('Error adding employee:', error);
      }
  );
}

resetForm() {
  this.employeeForm.resetForm();
   // Reset form fields
  this.selectedImage = null;
  this.id='';
  this.name = '';
  this.age = 0;
  this.dob = '';
  this.image = '';
  this.bloodGroup = '';
  this.gender = '';
  this.email = '';
  this.mobileNumber = '';
  this.leaves = 0;
  this.position = '';
  this.package = '';
  this.status = '';
}

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}