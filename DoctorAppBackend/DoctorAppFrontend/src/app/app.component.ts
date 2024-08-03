import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title:string = 'Doctor App';
  users: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get("http://localhost:5207/api/user").subscribe({

      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('complete request')

    })
  }
}
