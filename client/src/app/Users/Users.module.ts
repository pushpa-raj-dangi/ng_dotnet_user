import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './Users.component';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(UsersRoutes)],
  declarations: [UsersComponent],
})
export class UsersModule {}
