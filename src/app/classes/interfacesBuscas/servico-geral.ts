import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { condicoesprocura, selectview } from '../CampoSessoes';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ServicoGeral {

  constructor(
    private http: HttpClient,
    private router :Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {



   }
   private ApiUrl = `${environment.Apiurl}`;
   getSelection(sele:condicoesprocura): Observable<selectview>{
    return this.http.post<selectview>(`${this.ApiUrl}Proc2/ComboboxesPost`,sele);
    }
}
