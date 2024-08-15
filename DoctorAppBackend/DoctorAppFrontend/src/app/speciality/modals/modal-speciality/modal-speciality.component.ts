import { speciality } from './../../interfaces/speciality';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecialityService } from '../../services/speciality.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-modal-speciality',
  templateUrl: './modal-speciality.component.html',
  styleUrls: ['./modal-speciality.component.css']
})
export class ModalSpecialityComponent implements OnInit{

  formSpeciality : FormGroup;
  title : string = "Add Speciality";
  buttonName : string = "Save";

  constructor(private modal: MatDialogRef<ModalSpecialityComponent>,
              @Inject(MAT_DIALOG_DATA) public specialityData: speciality,
              private fb: FormBuilder,
              private _specialityService : SpecialityService,
              private _sharedService : SharedService)  
  { 
    this.formSpeciality = this.fb.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      status : ['1', Validators.required] 
    })
  }

  ngOnInit(): void {
    if(this.specialityData != null){
      this.formSpeciality.patchValue({
        name : this.specialityData.name,
        description : this.specialityData.description,
        status : this.specialityData.status.toString() // Corregido
      })
    }
  }

  createOrUpdateSpeciality(){
    const speciality: speciality = {
      id : this.specialityData == null ? 0 : this.specialityData.id,
      name : this.formSpeciality.value.name,
      description : this.formSpeciality.value.description,
      status : parseInt(this.formSpeciality.value.status) 
    }

    if(this.specialityData == null){
      // Crear nueva especialidad
      this._specialityService.create(speciality).subscribe({
          next: (data) => {
            if(data.isSuccesfuly) {
              this._sharedService.openSnackBar('Speciality created successfully','Success');
              this.modal.close(true);
            } else {
              this._sharedService.openSnackBar('Speciality not created','Error');
            }
          },
          error: (error) => {
            console.log(error);
          }
      })
    } else {
      // Actualizar especialidad existente
      this._specialityService.update(speciality).subscribe({
        next: (data) => {
          if(data.isSuccesfuly) {
            this._sharedService.openSnackBar('Speciality updated successfully','Success');
            this.modal.close(true);
          } else {
            this._sharedService.openSnackBar('Speciality not updated','Error');
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
