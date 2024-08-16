import { address } from './../../interfaces/address';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../../services/address.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.css']
})
export class ModalAddressComponent implements OnInit{

  formAddress : FormGroup;
  title: string="Add Address";
  buttonName : string ="Save";

  constructor
  (
    private modal: MatDialogRef<ModalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public addressData : address,
    private fb: FormBuilder,
    private _addressService : AddressService,
    private _sharedService : SharedService
  )
  {
      this.formAddress = this.fb.group
      ({
        nameStreet:['',Validators.required],
        numberStreet:['',Validators.required],
        zipCode:['',Validators.required],
        description:['']
      })

      if(this.addressData!=null)
      {
        this.title = "Update address"
        this.buttonName = "Update"
      }
  }

  
  ngOnInit(): void 
  {
    if(this.addressData !=null)
    {
        this.formAddress.patchValue
        ({
          nameStreet : this.addressData.nameStreet,
          numberStreet : this.addressData.numberStreet,
          zipCode : this.addressData.zipCode,
          description : this.addressData.zipCode
        })
    }
  }

  createOrUpdateAddress()
  {
    const address : address =
    {
      id : this.addressData == null ? 0 : this.addressData.id,
      nameStreet : this.formAddress.value.nameStreet,
      numberStreet : this.formAddress.value.numberStreet,
      zipCode : this.formAddress.value.zipCode,
      description : this.formAddress.value.description,
    }

    if(this.addressData == null)
    {
      this._addressService.create(address).subscribe
      ({
          next:(data)=>
          {
              if(data.isSuccesfuly)
              {
                this._sharedService.openSnackBar('Address created successfully','succes');
                this.modal.close(true);
              }
              else
              {
                this._sharedService.openSnackBar('Error to created Address','Error');
              }
          },
          error:(error)=>
          {
              console.log(error);
          }
      })
    }
    else
    {
      this._addressService.update(address).subscribe
      ({
          next:(data)=>
          {
              if(data.isSuccesfuly)
              {
                this._sharedService.openSnackBar('Address updated successfully','succes');
                this.modal.close(true);
              }
              else
              {
                this._sharedService.openSnackBar('Error to updated Address','Error');
              }
          },
          error:(error)=>
          {
              console.log(error);
          }
      })
    }
  }

}
