import { formatCurrency } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { interval } from 'rxjs';



@Component({
  selector: 'app-form-reg',
  templateUrl: './form-reg.component.html',
  styleUrls: ['./form-reg.component.scss']
})
export class FormRegComponent implements OnInit {



  constructor( private http: HttpClient){}

  ngOnInit(){}

  onUserCreate(user: {nameUser: string,  cognomeUser: string, cellulareUser: string, username: string, password:string}){
    console.log(user);
    const headers = new HttpHeaders({'myHeader': "CryptoUnisa"});
    this.http.post('https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/users.json',user, {headers: headers})
    .subscribe((res)=> {

    });
  }

}


