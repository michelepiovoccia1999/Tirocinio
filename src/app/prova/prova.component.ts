import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { ApiService } from '../service/api.service';
import { ContractService } from '../service/contract.service';
import AOS from 'aos';
@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.scss'],
})
export class ProvaComponent implements OnInit {
  bannerData: any = [];

  constructor(
    private http: HttpClient,
    private api: ApiService,
    public contractService: ContractService
  ) {}

  ngOnInit() {
    this.getAllData();
    this.getBannerData();
    AOS.iniy();
  }

  section1_var = false;
  section2_var = false;
  section3_var = false;

  //funzione per scroll homePage
  @HostListener('document:scroll')
  scrollfunction() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.section1_var = true;
      this.section2_var = false;
      this.section3_var = false;
    }

    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      this.section1_var = false;
      this.section2_var = true;
      this.section3_var = false;
    }

    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      this.section1_var = false;
      this.section2_var = false;
      this.section3_var = true;
    }
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
      console.log('IndirizzoAccount', indirizzoAccount);
      this.contractService.setAddress(indirizzoAccount);
    });
  }

  async getBalance() {}
}
