import { Medic } from './../../interfaces/medic';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { speciality } from '../../../speciality/interfaces/speciality';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecialityService } from '../../../speciality/services/speciality.service';
import { MedicService } from '../../services/medic.service';
import { SharedService } from '../../../shared/shared.service';
import { AddressService } from '../../../address/services/address.service';
import { address } from '../../../address/interfaces/address';

@Component({
  selector: 'app-modal-medic',
  templateUrl: './modal-medic.component.html',
  styleUrls: ['./modal-medic.component.css']
})
export class ModalMedicComponent implements OnInit{

  formMedic: FormGroup;
  title: string ="Add";
  nameButton:string ="Save";
  speialityList : speciality[] = [];

  constructor
  (
    private modal:MatDialogRef<ModalMedicComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMedic: Medic,
    private fb: FormBuilder,
    private _addressService: AddressService,
    private _specialityService: SpecialityService,
    private _medicService: MedicService,
    private _sharedService: SharedService,
  ){
    this.formMedic = this.fb.group
    ({
      firstName:['',Validators.required],
      middleName:[''],
      lastName:['',Validators.required],
      phone:['',Validators.required],
      gender:['Male',Validators.required],
      specialityId:['',Validators.required],
      addressId:[''],
      status:['1',Validators.required],

      nameStreet:['',Validators.required],
      numberStreet:['',Validators.required],
      zipCode:['',Validators.required],
      description:['',Validators.required]
    });

    if(this.dataMedic !=null)
    {
        this.nameButton = "Update",
        this.title = "Edit"
    }

    this._specialityService.listActives().subscribe
    ({
      next:(data)=>
      {
        if(data.isSuccesfuly) this.speialityList=data.result;
      },
      error:(e)=>{console.log("Error to refield speciality active list")}
    });
  }

  ngOnInit(): void {
    if(this.dataMedic !=null)
    {
      this.formMedic.patchValue
      ({
        firstName:this.dataMedic.firstName,
        middleName:this.dataMedic.middleName,
        lastName:this.dataMedic.lastName,
        phone:this.dataMedic.phone,
        gender:this.dataMedic.gender,
        specialityId:this.dataMedic.specialityId,
        addressId:this.dataMedic.addressId,
        status:this.dataMedic.status,
  
        nameStreet:this.dataMedic.nameStreet,
        numberStreet:this.dataMedic.numberStreet,
        zipCode:this.dataMedic.zipCode,
        description:this.dataMedic.description
      })
    }
  }
  // Método para crear la dirección y devolver su ID
  createAddress(): Promise<number> {
    const address: address = {
        id: 0,
        nameStreet: this.formMedic.value.nameStreet,
        numberStreet: this.formMedic.value.numberStreet,
        zipCode: this.formMedic.value.zipCode,
        description: this.formMedic.value.description,
    };

    return new Promise<number>((resolve, reject) => {
        this._addressService.create(address).subscribe({
            next: (data) => {
                if (data.isSuccesfuly && data.result) {
                    resolve(data.result);  // Usar el ID de la dirección creada
                } else {
                    this._sharedService.openSnackBar('Error to create Address', 'Error');
                    reject('Error: No ID returned '+`${data.result}`);
                }
            },
            error: (error) => {
                console.log(error);
                this._sharedService.openSnackBar('Error to create Address', 'Error');
                reject(error);
            }
        });
    });
}


  // Método para crear o actualizar el médico
  createOrUpdateMedic() {
    console.log('Invocando createOrUpdateMedic');

    this.createAddress().then((addressId) => {
      const medic: Medic = {
        id: this.dataMedic == null ? 0 : this.dataMedic.id,
        firstName: this.formMedic.value.firstName,
        middleName: this.formMedic.value.middleName,
        lastName: this.formMedic.value.lastName,
        phone: this.formMedic.value.phone,
        gender: parseInt(this.formMedic.value.gender, 10),
        specialityId: parseInt(this.formMedic.value.specialityId, 10),
        addressId: addressId,  // Usar el ID de la dirección recién creada
        status: parseInt(this.formMedic.value.status, 10),
        specialityName: '',
        addressName: '',
        nameStreet: this.formMedic.value.nameStreet,
        numberStreet: this.formMedic.value.numberStreet,
        zipCode: this.formMedic.value.zipCode,
        description: this.formMedic.value.description
      };

      if (this.dataMedic == null) {
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
            console.log(e);
            this._sharedService.openSnackBar(e.error.errors, 'Error!');
          }
        });
      }
    }).catch(error => {
      console.log('Error in address creation:', error);
    });
  }
  /*
  createOrUpdateMedic()
  {
    console.log('Invocando createOrUpdateMedic');
    const medic : Medic =
    {
      id : this.dataMedic == null ? 0 : this.dataMedic.id,
      firstName: this.formMedic.value.firstName,
      middleName:this.formMedic.value.middleName,
      lastName:this.formMedic.value.lastName,
      phone:this.formMedic.value.phone,
      gender:parseInt(this.formMedic.value.gender),
      specialityId:parseInt(this.formMedic.value.specialityId),
      addressId:parseInt(this.formMedic.value.addresId, 10),
      status:parseInt(this.formMedic.value.status),

      specialityName:'',
      addressName:'',

      nameStreet:this.formMedic.value.nameStreet,
      numberStreet:this.formMedic.value.numberStreet,
      zipCode:this.formMedic.value.zipCode,
      description:this.formMedic.value.description
    }


    console.log('Objeto medic:', medic);
    if(this.dataMedic == null)
    {
        this._medicService.create(medic).subscribe
        ({
            next:(data)=>
            {
              if(data.isSuccesfuly)
              {
                this._sharedService.openSnackBar('New Medic Succes','Succes RECORD');
                this.modal.close("true");
              }
              else{
                this._sharedService.openSnackBar('Error to create medic','Warning !!');
              }
            },
            error:(e)=>{
              this._sharedService.openSnackBar(e.error.errors, 'error!');
            }

        })
    }
    else
    {
      this._medicService.update(medic).subscribe
      ({
        next:(data)=>
          {
            if(data.isSuccesfuly)
            {
              this._sharedService.openSnackBar('Update Medic Succes','Succes RECORD');
              this.modal.close("true");
            }
            else{
              this._sharedService.openSnackBar('Error to update medic','Warning !!');
            }
          },
          error:(e)=>{
            console.log(e);
            this._sharedService.openSnackBar(e.erro.erros,'error!')
          }
      })
    }
  }
  */
}
