import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatSnackBarModule,
    RouterLink,
    MatInputModule,
    MatButton,
    MatIconModule,
  ],
})
export class LoginComponent {
  email!: string;
  password!: string;
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  router = inject(Router);
  hide = signal(true);

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.snackbar.open('Logged in successfully', 'Close', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        let err = error.error as ApiResponse<string>;
        console.log(err);

        this.snackbar.open(err.message, 'Close', {
          duration: 3000,
        });
      },
      complete: () => {
        console.log('complete');
        this.router.navigate(['/users']);
      },
    });
  }

  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
