import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { map, Observable } from 'rxjs';
import { UserDetail } from '../../models/user-detail';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatusPipe } from '../../shared/pipes/status.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [AsyncPipe, RouterLink, CommonModule, StatusPipe],
})
export class UserListComponent implements OnInit {
  users$!: Observable<UserDetail[]>;
  userService = inject(UserService);

  sortColumn: string = 'id';
  sortDirection: string = 'asc';

  ngOnInit() {
    this.users$ = this.userService
      .getAllUsers()
      .pipe(
        map((users) =>
          this.sortUsers(users, this.sortColumn, this.sortDirection)
        )
      );
  }

  sortUsers(
    users: UserDetail[],
    column: string,
    direction: string
  ): UserDetail[] {
    return [...users].sort((a, b) => {
      const valueA = (a as any)[column];
      const valueB = (b as any)[column];

      if (valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.users$ = this.userService
      .getAllUsers()
      .pipe(
        map((users) =>
          this.sortUsers(users, this.sortColumn, this.sortDirection)
        )
      );
  }
}
