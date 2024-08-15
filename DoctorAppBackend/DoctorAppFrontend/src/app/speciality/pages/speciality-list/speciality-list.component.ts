import { SharedService } from './../../../shared/shared.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { speciality } from '../../interfaces/speciality';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialityService } from '../../services/speciality.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalSpecialityComponent } from '../../modals/modal-speciality/modal-speciality.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.css']
})
export class SpecialityListComponent implements OnInit, AfterViewInit{
  
  displayedColumns: string[] = [
    'name',
    'description',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<speciality>([]);

  @ViewChild(MatPaginator) paginatorTable!: MatPaginator;

  constructor(
    private _specialityService: SpecialityService,
    private _sharedService : SharedService,
    private dialog: MatDialog   
  ) { }

  getSpecialities(){
    this._specialityService.list().subscribe({
      next: (data) => {
        if(data.isSuccesfuly){
          this.dataSource.data = data.result;
        } else {
          this._sharedService.openSnackBar(
            'There are not any specialities in the database',
            'Warning!'
          );
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getSpecialities();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorTable;
  }

  newSpeciality(){
    this.dialog
    .open(ModalSpecialityComponent, 
    {
      disableClose: true,
      width: '400px',
    })
    .afterClosed().subscribe((result) => {
      if(result === true) {
        // Refrescar la lista
        this.getSpecialities();
      }
    })
  }
  editSpeciality(speciality : speciality)
  {

    this.dialog
    .open(ModalSpecialityComponent, 
    {
      disableClose: true,
      width: '400px',
      data: speciality
    })
    .afterClosed()
    .subscribe((result) => {
      if(result === true)  this.getSpecialities();
      
    })
    //always check the rute in the service return this.http.put<ApiResponse>(`${this.baseUrl}${request.id}`,request); without id
  }

  deleteSpeciality(speciality : speciality){
    Swal.fire
    ({
      title: 'Are you sure about deleting this speciality?',
      text: speciality.name,
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
        this._specialityService.delete(speciality.id).subscribe({
          next: (data) => 
            {
              if(data.isSuccesfuly)
              {
                this._sharedService.openSnackBar('Speciality deleted successfully','Success');
                this.getSpecialities();
              } 
              else 
              {
                this._sharedService.openSnackBar('Speciality not deleted','Error');
              }
            },
            error: (err) => {
              console.log(err);
            }
        });
      }
    });
  }
}