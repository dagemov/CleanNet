import { address } from './../../interfaces/address';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddressService } from '../../services/address.service';
import { SharedService } from '../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddressComponent } from '../../modals/modal-address/modal-address.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = 
  [
    'nameStreet',
    'numberStreet',
    'zipCode',
    'description',
    'actions'
  ];

  dataSource= new MatTableDataSource<address>([]);

  @ViewChild(MatPaginator) paginatorTable!: MatPaginator;

  constructor(
    private _addresService : AddressService,
    private _sharedService : SharedService,
    private dialog: MatDialog
  ) 
  {  }

  getAddress(){
    this._addresService.list().subscribe({
      next: (data) => {
        if(data.isSuccesfuly)
        {
            this.dataSource.data = data.result;
        }
        else
        {
          this._sharedService.openSnackBar('There arent address in the database','Warning');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit():void{
    this.getAddress();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginatorTable;
  }

  newAddress(){
   this.dialog
   .open(ModalAddressComponent,
    {
        disableClose:true,
        width: '400px'
    })
    .afterClosed().subscribe((result)=>
    {
      if(result==true) this.getAddress();
    })
  }

  editAddress(address : address){
    this.dialog
    .open(ModalAddressComponent,
     {
         disableClose:true,
         width: '400px',
         data : address
     })
     .afterClosed().subscribe((result)=>
     {
       if(result==true) this.getAddress();
     })
  }

  deleteAddress(address : address){
    Swal.fire
    ({
      title: 'Are you sure about deleting this address?',
      text: address.nameStreet +"-"+ address.numberStreet +"-"+ address.zipCode,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, delete it',
      
    })
    .then((result)=>{
      if(result.isConfirmed)
      {
        this._addresService.delete(address.id).subscribe
        ({
            next:(data)=>
            {
                if(data.isSuccesfuly)
                {
                  this._sharedService.openSnackBar('Address deleted successfully','Success');
                  this.getAddress();
                }
                else
                {
                  this._sharedService.openSnackBar('There is an error to delete this addres'+`${address.nameStreet}`,'Error');
                }
            },
            error:(error)=>{
              console.log(error);
            }
        })
      }
    })
  }
}
