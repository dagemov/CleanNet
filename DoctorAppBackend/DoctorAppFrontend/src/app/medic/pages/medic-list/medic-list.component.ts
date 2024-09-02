import { Medic } from './../../interfaces/medic';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MedicService } from '../../services/medic.service';
import { SharedService } from '../../../shared/shared.service';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalMedicComponent } from '../../modals/modal-medic/modal-medic.component';

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

  editMedic(Medic:Medic){
    this.dialog
    .open(ModalMedicComponent,{disableClose:true,width:'600px',data : Medic})
    .afterClosed()
    .subscribe((result)=>
    {
      if(result === 'true') this.getMedicts();
    })
  }

  deleteMedic(Medic:Medic){

  }
}
