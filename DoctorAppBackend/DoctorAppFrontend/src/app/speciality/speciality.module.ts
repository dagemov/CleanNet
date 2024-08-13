import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SpecialityService } from './services/speciality.service';
import { SpecialityListComponent } from './pages/speciality-list/speciality-list.component';




@NgModule({
  declarations: [
    SpecialityListComponent
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
