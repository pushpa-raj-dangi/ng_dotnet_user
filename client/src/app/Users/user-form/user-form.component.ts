import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Status, UserDetail } from '../../models/user-detail';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,

  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
  ],
})
export class UserFormComponent implements OnInit {
  userDetailForm!: FormGroup;
  fb = inject(FormBuilder);
  statusEnum = Status;
  userService = inject(UserService);
  router = inject(Router);
  getStatusOptions() {
    return Object.keys(this.statusEnum).map((key) => ({
      key,
      value: this.statusEnum[key as keyof typeof Status],
    }));
  }
  toast = inject(MatSnackBar);

  ngOnInit() {
    this.userDetailForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      status: [null, Validators.required],
      designation: [''],
    });
  }

  onSubmit(): void {
    if (this.userDetailForm.valid) {
      const userDetail: UserDetail = this.userDetailForm.value;
      this.userService.createUser(userDetail).subscribe((response) => {
        this.toast.open('User created successfully', 'Close');
        this.router.navigate(['users']);
      });
    } else {
      this.toast.open('Please fill all the required fields', 'Close');
    }
  }
}
