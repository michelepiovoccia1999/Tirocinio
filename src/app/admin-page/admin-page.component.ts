import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Crypto } from '../model/crypto';
import {Users } from '../model/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  allCrypto: Crypto[]= [];
  allUsers: Users[]= [];
  isFatching: boolean= false;

  oggi= Date.now();

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.fatchCrypto();
  }

  onCryptofatch(){
    this.fatchCrypto();
  }

  onCryptoCreate(crypto: {nameCrypto: string,  priceCrypto: string}){
    console.log(crypto);
    const headers = new HttpHeaders({'myHeader': "CryptoUnisa"});
    this.http.post('https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/crypto.json',crypto, {headers: headers})
    .subscribe((res)=> {
      this.onCryptofatch();
    });
  }

  private fatchCrypto(){
    this.isFatching= true;
    this.http.get<{[key: string]: Crypto}>('https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/crypto.json')
    .pipe(map((res) =>{
      const crypto= []
      for(const key in res){
        if (res.hasOwnProperty(key)){
          crypto.push({...res[key], id: key})
        }
      }
      return crypto;
    }))
    .subscribe((crypto) =>{
      console.log(crypto);
      this.allCrypto= crypto;
      this.isFatching= true;
    })

  }

  private fatchUsers(){

    this.isFatching= true;
    this.http.get<{[key: string]: Users }>('https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    .pipe(map((res) =>{
      const users= []
      for(const key in res){
        if (res.hasOwnProperty(key)){
          users.push({...res[key], id: key})
        }
      }
      return crypto;
    }))
    .subscribe((users) =>{
      console.log(users);

      this.isFatching= true;
    })

  }


  onDelete(id: string){
     this.http.delete('https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/crypto/'+id+'.json')
     .subscribe((res)=> {
      this.onCryptofatch();
    });
  }

}
