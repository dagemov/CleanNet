import { SharedService } from './../../../shared/shared.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { speciality } from '../../interfaces/speciality';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialityService } from '../../services/speciality.service';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrl: './speciality-list.component.css'
})
export class SpecialityListComponent implements OnInit, AfterViewInit{
  
  displayedColumns: string[] = [
    'name',
    'description',
    'satus',
    'actions'
  ];

  dataInit: speciality[] = []; //Load the data from the API in this array ( liker blazor)
  dataSource = new MatTableDataSource(this.dataInit);

  @ViewChild(MatPaginator) paginatorTable!: MatPaginator;

  constructor(
    private _specialityService: SpecialityService,
    private _sharedService : SharedService   
  ) { }

  getSpecialities(){
    this._specialityService.list().subscribe({
      next: (data) => {
        if(data.isSuccesfuly){
          this.dataSource = new MatTableDataSource(data.result);
          this.dataSource.paginator = this.paginatorTable;
        }
        else{
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
}
