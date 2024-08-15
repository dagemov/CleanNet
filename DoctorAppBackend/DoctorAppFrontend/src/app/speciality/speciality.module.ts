import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SpecialityService } from './services/speciality.service';
import { SpecialityListComponent } from './pages/speciality-list/speciality-list.component';
import { ModalSpecialityComponent } from './modals/modal-speciality/modal-speciality.component';




@NgModule({
  declarations: [
    SpecialityListComponent,
    ModalSpecialityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
      SpecialityService
  ],
})
export class SpecialityModule { }
