import { Injectable } from '@angular/core';
import { AbiItem } from 'web3-utils'

import Web3 from 'web3';

declare const window: any;

const abiNewContract = [
  {
    outputs: [
      {
        internalType: 'uint256',
        name: 'newValue',
        type: 'uint256',
      },
    ],
    name: 'getValue',
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  address: string = null;

  window: any;
  addresses: any;

  constructor() {}

  public getAddress() {
    return this.address;
  }

  public setAddress(param: string) {
    this.address = param;
  }

  private getAccounts = async () => {
    try {
      return await window.ethereum.request({ method: 'eth_accounts' });
    } catch (e) {
      return [];
    }
  };

  public openMetamask = async () => {
    window.web3 = new Web3(window.ethereum);
    this.addresses = await this.getAccounts();
    console.log('addresses', this.addresses);
    if (!this.addresses.length) {
      try {
        this.addresses = await window.ethereum.enable();
      } catch (e) {
        return false;
      }
    }
    return this.addresses.length ? this.addresses[0] : null;
  };

  public newContract = async () => {
    try {
      const web3= new Web3(Web3.givenProvider);
      console.log('PROVIDER', window.web3.eth.givenProvider);
      console.log('ADRESS', window.web3.utils.toChecksumAddress(this.address));

      const contract = new web3.eth.Contract(
        abiNewContract as unknown as AbiItem[],
        this.address
      );
      console.log(contract);
     // const token = await contract.methods.Token().call();

      //console.log('token', token);
      contract.methods.getValue().call().then(console.log);

      //return token;
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };
}
