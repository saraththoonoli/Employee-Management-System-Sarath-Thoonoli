import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AuthGuard } from './auth.guard';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { WilsCardComponent } from './wils-card/wils-card.component';
import { InfoComponent } from './info/info.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeTrainningComponent } from './employee-trainning/employee-trainning.component';
import { DeactivateGuard } from './deactivate.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hr-dashboard', component: HrDashboardComponent,canActivate: [AuthGuard] },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'employee-details', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create-employee', component: CreateEmployeeComponent, canDeactivate: [DeactivateGuard],canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditEmployeeComponent, canActivate: [AuthGuard], },
  { path: 'emp-details', component: EmpDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'leave-details', component: LeaveApplicationComponent, canActivate: [AuthGuard]  },
  { path: 'leave-req', component: LeaveRequestComponent, canActivate: [AuthGuard]  },
  { path: 'edit-employee/:id', component: EmpEditComponent, canActivate: [AuthGuard], },
  {path:'info',component:InfoComponent},
  {path:'emp-trainning',component:EmployeeTrainningComponent},
  {path:'**',component:WilsCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
