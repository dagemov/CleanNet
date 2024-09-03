import { Medic } from './../../interfaces/medic';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MedicService } from '../../services/medic.service';
import { SharedService } from '../../../shared/shared.service';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalMedicComponent } from '../../modals/modal-medic/modal-medic.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css']
})
export class MedicListComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] =
  [
      'firstName',
      'lastName',
      'phone',
      'addressName',
      'gender',
      'specialityName',
      'status',
      'actions'
  ];

  
  dataInit : Medic[] = [];
  dataSource = new MatTableDataSource(this.dataInit);

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor
  (
    private _medicService:MedicService,
    private _shared: SharedService,
    private dialog: MatDialog
  )
  {

  }

  getMedicts(){
    this._medicService.list().subscribe
    ({
      next:(data) => 
      {
        if(data.isSuccesfuly)
        {
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator= this.paginator;
        }
        else
        {
          this._shared.openSnackBar('Not found records in this context','Warning!');
        }
      },
      error:(e)=>{ console.log(e)}
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getMedicts();
  }

  applyFilter(event:Event){

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }

  createMedic(){
    this.dialog
    .open(ModalMedicComponent,{disableClose:true,width:'600px'})
    .afterClosed()
    .subscribe((result)=>
    {
      if(result==='true')
      {
        this.getMedicts();
      }
    })
  }

  editMedic(medic: Medic) {
    this.dialog
    .open(ModalMedicComponent, {disableClose: true, width: '600px', data: medic})
    .afterClosed()
    .subscribe((result) => {
        if (result === 'true') {
            this.getMedicts(); // Refresh
        }
    });
  }

  deleteMedic(Medic:Medic)
  {
    Swal.fire
    ({
      title:'Are you sure about deleting this medic ?',
      text: Medic.firstName+Medic.lastName+" \n"+Medic.specialityName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, delete it',
    })
    .then((result)=>
    {
      if(result.isConfirmed)
      {
        this._medicService.delete(Medic.id).subscribe
        ({
          next:(data)=>
          {
            if(data.isSuccesfuly)
            {
              this._shared.openSnackBar('Medic deleted successfully','Success');
              this.getMedicts();
            }
            else
            {
              this._shared.openSnackBar('Speciality not deleted','Error');
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }
}
