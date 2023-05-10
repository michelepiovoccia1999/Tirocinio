import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '../service/api.service';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  allCrypto: Crypto[] = [];
  bannerData: any = [];

  constructor(private http: HttpClient, private api: ApiService, public contractService: ContractService) {}

  ngOnInit() {
    this.getAllData();
    this.getBannerData();
    this.fatchCrypto();

  }

  onCryptofatch() {
    this.fatchCrypto();
  }

  onCryptoCreate(crypto: {
    nameCrypto: string;
    descCrypto: string;
    priceCrypto: string;
  }) {
    console.log(crypto);
    const headers = new HttpHeaders({ myHeader: 'CryptoUnisa' });
    this.http
      .post(
        'https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/crypto.json',
        crypto,
        { headers: headers }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  private fatchCrypto() {
    this.http
      .get<{ [key: string]: Crypto }>(
        'https://unisatirocinio-default-rtdb.europe-west1.firebasedatabase.app/crypto.json'
      )
      .pipe(
        map((res) => {
          const crypto = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              crypto.push({ ...res[key], id: key });
            }
          }
          return crypto;
        })
      )
      .subscribe((crypto) => {
        console.log(crypto);
        this.allCrypto = crypto;
      });
  }

  getBannerData() {
    this.api.getTrendingCurrency('INR').subscribe((res) => {
      console.log(res);
      this.bannerData = res;
    });
  }

  getAllData() {
    this.api.getCurrency('INR').subscribe((res) => {
      console.log(res);
    });
  }

  async handleAuth() {
    this.contractService.openMetamask().then((indirizzoAccount) => {
      console.log('IndirizzoAccount', indirizzoAccount );
      this.contractService.setAddress(indirizzoAccount);

    });
  }

  async newContract(){

    this.contractService.newContract().then((contract) => {
      console.log('CONTRACT', contract);
    })
  }


}
