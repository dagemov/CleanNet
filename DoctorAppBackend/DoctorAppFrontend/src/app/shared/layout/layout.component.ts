import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit{

    email: string = '';
    constructor(private router: Router, private sharedService : SharedService)
    { 

    }
  ngOnInit(): void 
  {
    const userToken = this.sharedService.getSesion();
    if(userToken!=null){
      this.email = userToken.email;
    }
  }

  logout()
  {
    this.sharedService.deleteSesion();
    this.router.navigate(['login']);
  }
}
