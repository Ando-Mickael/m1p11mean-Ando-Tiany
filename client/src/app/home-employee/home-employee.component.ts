// home-employee.component.ts

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {EmployeeService} from '../services/employee.service';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css']
})
export class HomeEmployeeComponent implements OnInit {
  employee: any;
  updateForm: FormGroup;
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workSchedule: this.formBuilder.group({
        Monday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        }),
        Tuesday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        }),
        Wednesday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        }),
        Thursday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        }),
        Friday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        }),
        Saturday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        }),
        Sunday: this.formBuilder.group({
          startTime: [''],
          endTime: ['']
        })
      })
      // Add more controls as needed
    });
  }

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      this.employeeService.getEmployeeById(userId).subscribe(
        (employee) => {
          this.employee = employee;
          // Update the form controls with the employee data
          this.updateForm.patchValue({
            firstName: employee.userInfo.firstName,
            lastName: employee.userInfo.lastName,
            email: employee.userInfo.email,
            workSchedule: {
              Monday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Monday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Monday')?.endTime || ''
              },
              Tuesday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Tuesday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Tuesday')?.endTime || ''
              },
              Wednesday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Wednesday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Wednesday')?.endTime || ''
              },
              Thursday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Thursday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Thursday')?.endTime || ''
              },
              Friday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Friday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Friday')?.endTime || ''
              },
              Saturday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Saturday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Saturday')?.endTime || ''
              },
              Sunday: {
                startTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Sunday')?.startTime || '',
                endTime: employee.workSchedule.find((day: { day: string }) => day.day === 'Sunday')?.endTime || ''
              }
            }
            // Update more controls as needed
          });
        },
        (error) => {
          console.error('Error loading employee data', error);
          // Handle error (e.g., show a notification to the user)
        }
      );
    } else {
      console.error('User ID not found in the token.');
      // Handle the case where user ID is not found in the token
    }
  }

  getStartTimeControl(day: string): FormControl | null {
    return this.updateForm.get(`workSchedule.${day}.startTime`) as FormControl;
  }

  getEndTimeControl(day: string): FormControl | null {
    return this.updateForm.get(`workSchedule.${day}.endTime`) as FormControl;
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    if (userId) {
      const formData = {
        email: this.updateForm.get('email')?.value,
        firstName: this.updateForm.get('firstName')?.value,
        lastName: this.updateForm.get('lastName')?.value,
        workSchedule: this.extractWorkScheduleFromForm(),
      };

      // Use the employee service to send a POST request to update the employee data
      this.employeeService.updateEmployee(userId, formData).subscribe(
        (updatedEmployee) => {
          console.log('Employee updated successfully', updatedEmployee);
          // You can handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error updating employee', error);
          // You can handle errors, e.g., show an error message
        }
      );
    } else {
      console.error('User ID not found in the token.');
      // Handle the case where user ID is not found in the token
    }
  }

  private extractWorkScheduleFromForm(): any[] {
    const workSchedule: any[] = [];
    this.daysOfWeek.forEach(day => {
      const startTime = this.updateForm.get(`workSchedule.${day}.startTime`)?.value;
      const endTime = this.updateForm.get(`workSchedule.${day}.endTime`)?.value;
      if (startTime !== '' && endTime !== '') {
        workSchedule.push({day, startTime, endTime});
      }
    });
    return workSchedule;
  }
}
