import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-profile-edit',
  templateUrl: './emp-profile-edit.component.html',
  styleUrls: ['./emp-profile-edit.component.scss']
})
export class EmpProfileEditComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  editProfileForm!: FormGroup;
  employeeUser: any;

  constructor(private fb: FormBuilder, private apiservice: ApiService) { }

  // Function Initialization

  ngOnInit(): void {
    // to get  login employee from localstorage
    this.employeeUser = JSON.parse(localStorage.getItem('employee') || '{}');
    this.createForm();
  }

  // Function to create edit form with current details of employee

  private createForm() {
    this.editProfileForm = this.fb.group({
      name: [this.employeeUser.name, Validators.required],
      phone: [this.employeeUser.phone, Validators.required],
      email: [this.employeeUser.email, [Validators.required, Validators.email]],
      dob: [this.employeeUser.dob, Validators.required],
      age: [this.employeeUser.age, Validators.required],
      Blood_group: [this.employeeUser.Blood_group, Validators.required],
      gender: [this.employeeUser.gender, Validators.required],
      username: [this.employeeUser.username, Validators.required],
      password: [this.employeeUser.password, Validators.required],
    });
  }

// Function to update the employee details with edited values

  onSubmit() {
    if (this.editProfileForm.valid) {
      const updatedProfile = {
        name: this.editProfileForm.value.name,
        age: this.editProfileForm.value.age,
        dob: this.editProfileForm.value.dob,
        Blood_group: this.editProfileForm.value.Blood_group,
        phone: this.editProfileForm.value.phone,
        email: this.editProfileForm.value.email,
        username: this.editProfileForm.value.username,
        password: this.editProfileForm.value.password
      };

      const employeeId = this.employeeUser.id;

      this.apiservice.updateEmpProfile(employeeId, updatedProfile).subscribe(
        response => {

          //  success SweetAlert notification on profile edited
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Profile updated successfully',
            confirmButtonText: 'OK'
          });
          console.log('Profile updated successfully', response);
        },
        error => {
          console.error('Error updating profile', error);
        }
      );
    }
  }

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
