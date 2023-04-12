import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './component/app-layout/login-layout/login-layout.component';
import { DefaultLayoutComponent } from './component/app-layout/default-layout/default-layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { DatatableComponent } from './component/datatable/datatable.component';
import { LoginComponent } from './component/authentication/login/login.component';
import { IncidentComponent } from './component/incident/incident.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./component/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
    component: LoginComponent
  },
  {
    path: "home",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      }
    ],
  },
  {
    path: "add",
    component: DefaultLayoutComponent,
    children: [
      {
        path: ":form",
        component: DynamicFormComponent,
      },
    ],
  },
  {
    path: "edit",
    component: DefaultLayoutComponent,
    children: [
      {
        path: ":form/:id",
        component: DynamicFormComponent,
      },
    ],
  },
  {
    path: "list",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        component: DatatableComponent,
      },
      {
        path: ":form",
        component: DatatableComponent,
      }
    ],
  },


  // {
  //   path: "add",
  //   component: DefaultLayoutComponent,
  //   children: [

  //     {
  //       path: "incident",
  //       component: IncidentComponent
  //     },
  //   ],
  // },

  {
    path: "incident",
    component: IncidentComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



