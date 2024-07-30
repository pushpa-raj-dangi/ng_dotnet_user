import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiResponse } from '../../models/api-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatIconModule,
  ],
})
export class RegisterComponent {
  email!: string;
  password!: string;
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  router = inject(Router);
  hide = signal(true);

  register() {
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.snackbar.open('Registered successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        let err = error.error as ApiResponse<string>;

        this.snackbar.open(err.message, 'Close', {
          duration: 3000,
        });
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
