import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoute } from './auth.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AuthRoute)],
})
export class AuthModule {}
