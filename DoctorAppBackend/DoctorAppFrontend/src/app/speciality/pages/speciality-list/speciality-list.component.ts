import { SharedService } from './../../../shared/shared.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { speciality } from '../../interfaces/speciality';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialityService } from '../../services/speciality.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalSpecialityComponent } from '../../modals/modal-speciality/modal-speciality.component';

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
}