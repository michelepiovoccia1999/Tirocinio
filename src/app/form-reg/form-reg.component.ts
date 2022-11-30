import { formatCurrency } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { interval } from 'rxjs';



@Component({
  selector: 'app-form-reg',
  templateUrl: './form-reg.component.html',
  styleUrls: ['./form-reg.component.scss']
})
export class FormRegComponent {

    homeform: FormGroup = new FormGroup({
      nome: new FormControl(null,Validators.required),
      cognome: new FormControl(null,Validators.required),
      indirizzo: new FormControl(null,Validators.required),
      cellulare: new FormControl(null,Validators.required),
      sesso: new FormControl(null),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  onSubmit(){
    console.log(this.homeform);
  }
}


