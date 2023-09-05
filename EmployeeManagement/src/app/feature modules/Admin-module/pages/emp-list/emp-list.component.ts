import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Employee } from 'src/app/core/interfaces/employee';
import { EmpDetailsComponent } from '../emp-details/emp-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})

export class EmpListComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  recordForm!: FormGroup;

  employees: Employee[] = [];
  selectedEmployee: any = {};

  editingEmployee: Employee | null = null;

  constructor(private apiservice: ApiService, public dialog: MatDialog, private renderer: Renderer2) { }

// Function Initialization

  ngOnInit(): void {
    this.loadEmployees();
  }

// Function to get all employees

  loadEmployees(): void {
    this.apiservice.GetEmployees().subscribe(
      (data: Employee[]): void => {
        this.employees = data;
        console.log(this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

   // Function to view  each employee details

   viewEmp(id: string) {
    this.apiservice.ViewEmp(id).subscribe((res) => {
      const dialogRef = this.dialog.open(EmpDetailsComponent, {
        data: res
      });
    })
  }

  //  Function to edit a employee details

  openEditModal(employee: any) {
    this.selectedEmployee = { ...employee };

    const editModal = document.getElementById('editModal');
    if (editModal) {
      this.renderer.setStyle(editModal, 'display', 'block');
      this.renderer.addClass(editModal, 'show');
    }
  }

  // Function to save edited details

  saveEditedEmployee() {
    if (this.selectedEmployee) {
      this.apiservice.updateEmployee(this.selectedEmployee).subscribe(
        () => {
          this.editingEmployee = null;
          this.loadEmployees();

          // Show a success notification using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Employee details updated successfully',
            showConfirmButton: false,
            timer: 1000 // Display for 1 seconds
          });
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

    //function to delete a employee by id

    deleteEmployee(employeeId: string): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to undo this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiservice.DeleteEmployee(employeeId).subscribe(
            () => {
              Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
              this.loadEmployees(); // Refresh employee list after deletion
            },
            (error) => {
              console.error('Error deleting employee:', error);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', ' Your Employee is in safemode', 'info');
        }
      });
    }


// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
