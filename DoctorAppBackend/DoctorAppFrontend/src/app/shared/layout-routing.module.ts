import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialityListComponent } from '../speciality/pages/speciality-list/speciality-list.component';
import { AddressListComponent } from '../address/pages/address-list/address-list.component';
import {} from '../speciality/speciality.module';
import {} from '../address/address.module';


const routes: Routes = [
  {
    path: '',component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'address',
        component : AddressListComponent,
        pathMatch : 'full'
      },
      {
        path: 'speciality',
        component : SpecialityListComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
