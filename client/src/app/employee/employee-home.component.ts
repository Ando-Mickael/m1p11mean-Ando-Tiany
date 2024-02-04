import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { FileUploadService } from '../services/file-upload.service';
import { MatFileUploadQueueService } from '../services/mat-file-upload-queue.service';

@Component({
  selector: 'employee-home',
  template: `
    <div *ngIf="employee">
      <h2>Mon Profil</h2>

      <form
        [formGroup]="updateForm"
        (ngSubmit)="onSubmit()"
        enctype="multipart/form-data"
      >
        <div class="form-group">
          <label for="image">Image:</label>
          <div
            cdkDropList
            #imageList="cdkDropList"
            [cdkDropListData]="employee.images"
            [cdkDropListConnectedTo]="['imageList']"
            (cdkDropListDropped)="onImageDropped($event)"
          >
            <div cdkDrag>
              <img
                [src]="
                  'http://localhost:3000/uploads/' + employee.userInfo.picture
                "
                alt="Image"
                width="100"
                height="100"
              />
            </div>
          </div>
          <input
            type="file"
            (change)="onImageSelected($event)"
            accept="image/*"
          />
        </div>

        <div class="form-group">
          <label for="firstName">Prénom:</label>
          <input type="text" id="firstName" formControlName="firstName" />
        </div>

        <div class="form-group">
          <label for="lastName">Nom:</label>
          <input type="text" id="lastName" formControlName="lastName" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" formControlName="email" />
        </div>

        <div class="form-group">
          <label for="workSchedule">Horaire de travail:</label>
          <div *ngFor="let day of daysOfWeek">
            <div>
              {{ day }}:
              <input
                type="text"
                [formControl]="getStartTimeControl(day)!"
                placeholder="Heure de début"
              />
              -
              <input
                type="text"
                [formControl]="getEndTimeControl(day)!"
                placeholder="Heure de fin"
              />
            </div>
          </div>
        </div>
        <button type="submit">Mettre à jour le profil</button>
      </form>
    </div>

    <div *ngIf="!employee">
      <p>Chargement des données de l'employé...</p>
    </div>
  `,
})
export class EmployeeHomeComponent implements OnInit {
  employee: any;
  updateForm: FormGroup;
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private fileUploadQueueService: MatFileUploadQueueService,
    private fileUploadService: FileUploadService
  ) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workSchedule: this.formBuilder.group({
        Monday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
        Tuesday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
        Wednesday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
        Thursday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
        Friday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
        Saturday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
        Sunday: this.formBuilder.group({
          startTime: [''],
          endTime: [''],
        }),
      }),
      // Add more controls as needed
    });
    this.fileUploadQueueService.uploadQueue$.subscribe((uploadQueue) => {
      // Handle file uploads, update your form, etc.
      console.log('Upload Queue:', uploadQueue);
    });
  }

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  onImageSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.fileUploadQueueService.addToQueue(files);
    // Handle other file-related logic if needed
  }

  onImageDropped(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.employee.images,
      event.previousIndex,
      event.currentIndex
    );
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
            picture: employee.userInfo.picture,
            workSchedule: {
              Monday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Monday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Monday'
                  )?.endTime || '',
              },
              Tuesday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Tuesday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Tuesday'
                  )?.endTime || '',
              },
              Wednesday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Wednesday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Wednesday'
                  )?.endTime || '',
              },
              Thursday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Thursday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Thursday'
                  )?.endTime || '',
              },
              Friday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Friday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Friday'
                  )?.endTime || '',
              },
              Saturday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Saturday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Saturday'
                  )?.endTime || '',
              },
              Sunday: {
                startTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Sunday'
                  )?.startTime || '',
                endTime:
                  employee.workSchedule.find(
                    (day: { day: string }) => day.day === 'Sunday'
                  )?.endTime || '',
              },
            },
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
      const formData: { [key: string]: any } = {
        // Specify the type of formData
        email: this.updateForm.get('email')?.value,
        firstName: this.updateForm.get('firstName')?.value,
        lastName: this.updateForm.get('lastName')?.value,
        workSchedule: this.extractWorkScheduleFromForm(),
      };

      const fileQueue = this.fileUploadQueueService.uploadQueue;

      if (fileQueue.length > 0) {
        // Upload files before submitting the form
        this.uploadFiles(fileQueue).subscribe(
          (fileNames) => {
            // Include file names in the formData
            formData['images'] = fileNames;

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
          },
          (error) => {
            console.error('Error uploading files', error);
            // You can handle errors, e.g., show an error message
          }
        );
      } else {
        // No files to upload, proceed with updating employee data
        this.employeeService.updateEmployee(userId, formData).subscribe(
          (updatedEmployee) => {
            console.log('Employee updated successfully', updatedEmployee);
            window.location.reload();
          },
          (error) => {
            console.error('Error updating employee', error);
            // You can handle errors, e.g., show an error message
          }
        );
      }
    } else {
      console.error('User ID not found in the token.');
      // Handle the case where user ID is not found in the token
    }
  }

  private uploadFiles(files: File[]): Observable<string[]> {
    const uploadObservables: Observable<any>[] = [];

    files.forEach((file) => {
      uploadObservables.push(this.fileUploadService.uploadFile(file));
    });

    return forkJoin(uploadObservables);
  }

  private extractWorkScheduleFromForm(): any[] {
    const workSchedule: any[] = [];
    this.daysOfWeek.forEach((day) => {
      const startTime = this.updateForm.get(
        `workSchedule.${day}.startTime`
      )?.value;
      const endTime = this.updateForm.get(`workSchedule.${day}.endTime`)?.value;
      if (startTime !== '' && endTime !== '') {
        workSchedule.push({ day, startTime, endTime });
      }
    });
    return workSchedule;
  }
}
