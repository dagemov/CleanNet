import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from './pages/address-list/address-list.component';
import { ModalAddressComponent } from './modals/modal-address/modal-address.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    AddressListComponent,
    ModalAddressComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class AddressModule { }
