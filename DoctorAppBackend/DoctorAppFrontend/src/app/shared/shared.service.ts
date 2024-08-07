import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../user/Interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _snackBar: MatSnackBar) 
  { 

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  saveSection(sesion:Sesion){
      localStorage.setItem("userSesion",JSON.stringify(sesion));
  }

  getSesion(){
    const sesionString = localStorage.getItem("userSesion");
    const userToken = JSON.parse(sesionString!);
    return userToken
  }

  deleteSesion(){
    localStorage.removeItem("userSesion");
  }
}
