import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MedicListComponent } from './pages/medic-list/medic-list.component';
import { MedicService } from './services/medic.service';



@NgModule({
  declarations: [
    MedicListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers:[
    MedicService
  ]
})
export class MedicModule { }
