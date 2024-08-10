import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
     pathMatch: 'full' //the empy path will redirect to login and is the default page
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'layout', //layout/dashboard , layaout/categories
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  {
    path:'**', //To redirect to login when the path is not found
    redirectTo:'',
    pathMatch:'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
