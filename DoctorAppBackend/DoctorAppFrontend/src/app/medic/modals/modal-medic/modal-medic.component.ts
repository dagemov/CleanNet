import { Medic } from './../../interfaces/medic';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { speciality } from '../../../speciality/interfaces/speciality';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecialityService } from '../../../speciality/services/speciality.service';
import { MedicService } from '../../services/medic.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-modal-medic',
  templateUrl: './modal-medic.component.html',
  styleUrls: ['./modal-medic.component.css']
})
export class ModalMedicComponent implements OnInit {

  formMedic: FormGroup;
  title: string = "Add";
  nameButton: string = "Save";
  speialityList: speciality[] = [];

  constructor(
    private modal: MatDialogRef<ModalMedicComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMedic: Medic,
    private fb: FormBuilder,
    private _specialityService: SpecialityService,
    private _medicService: MedicService,
    private _sharedService: SharedService,
  ) {
    this.formMedic = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['Male', Validators.required],
      specialityId: ['', Validators.required],
      addressId: [''], 
      status: ['1', Validators.required],
      nameStreet: ['', Validators.required],
      numberStreet: ['', Validators.required],
      zipCode: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (this.dataMedic != null) {
      this.nameButton = "Update";
      this.title = "Edit";
    }

    this._specialityService.listActives().subscribe({
      next: (data) => {
        if (data.isSuccesfuly) this.speialityList = data.result;
      },
      error: (e) => { console.log("Error to refill speciality active list", e); }
    });
  }

  ngOnInit(): void {
    if (this.dataMedic != null) {
      this.formMedic.patchValue({
        firstName: this.dataMedic.firstName,
        middleName: this.dataMedic.middleName,
        lastName: this.dataMedic.lastName,
        phone: this.dataMedic.phone,
        gender: this.dataMedic.gender,
        specialityId: this.dataMedic.specialityId,
        addressId: this.dataMedic.addressId, // Load AdressId
        status: this.dataMedic.status,
        nameStreet: this.dataMedic.nameStreet,
        numberStreet: this.dataMedic.numberStreet,
        zipCode: this.dataMedic.zipCode,
        description: this.dataMedic.description
      });
    }
  }


  createOrUpdateMedic() {
    const medic: Medic = {
      id: this.dataMedic == null ? 0 : this.dataMedic.id,
      firstName: this.formMedic.value.firstName,
      middleName: this.formMedic.value.middleName,
      lastName: this.formMedic.value.lastName,
      phone: this.formMedic.value.phone,
      gender: parseInt(this.formMedic.value.gender, 10),
      specialityId: parseInt(this.formMedic.value.specialityId, 10),
      addressId: this.dataMedic?.addressId ?? 0,  // Use the acutal id or 0 if is a new medic
      status: parseInt(this.formMedic.value.status, 10),
      specialityName: '',
      addressName: '',
      nameStreet: this.formMedic.value.nameStreet,
      numberStreet: this.formMedic.value.numberStreet,
      zipCode: this.formMedic.value.zipCode,
      description: this.formMedic.value.description
    };

    if (this.dataMedic == null) {
      // Create new
      this._medicService.create(medic).subscribe({
        next: (data) => {
          if (data.isSuccesfuly) {
            this._sharedService.openSnackBar('New Medic Success', 'Success RECORD');
            this.modal.close("true");
          } else {
            this._sharedService.openSnackBar('Error to create medic', 'Warning !!');
          }
        },
        error: (e) => {
          this._sharedService.openSnackBar(e.error.errors, 'Error!');
        }
      });
    } else {
        //Updated medic
      this._medicService.update(medic).subscribe({
        next: (data) => {
          if (data.isSuccesfuly) {
            this._sharedService.openSnackBar('Update Medic Success', 'Success RECORD');
            this.modal.close("true");
          } else {
            this._sharedService.openSnackBar('Error to update medic', 'Warning !!');
          }
        },
        error: (e) => {
          this._sharedService.openSnackBar(e.error.errors, 'Error!');
        }
      });
    }
  }
}
