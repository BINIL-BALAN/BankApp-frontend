import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'bankApplication/login',
    pathMatch:'full'
  },
  {
    path:'bankApplication/login',
    component:LoginComponent
  },
  {
    path:'bankApplication/registration',
    component:RegistrationComponent
  },
  {
    path:'bankApplication/dashboard',
    component:DashboardComponent
  },
  {
    path:'bankApplication/Transctions',
    component:MiniStatementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
