import { Injectable } from '@angular/core';
import Web3 from "web3";

declare const window: any;

const address ='there will be address';
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "",
        }
      ],
      "name": "Token",
      "type": "event"
    },
];

@Injectable({
  providedIn: 'root'
})



export class ContractService {


  window:any;
  addresses: any;


    constructor() { }
    private getAccounts = async () => {
        try {
            return await window.ethereum.request({ method: 'eth_accounts' });
        } catch (e) {
            return [];
        }
    }

    public openMetamask = async () => {
        window.web3 = new Web3(window.ethereum);
        this.addresses = await this.getAccounts();
        console.log("addresses",this.addresses);
        if (!this.addresses.length) {
            try {
                this.addresses = await window.ethereum.enable();
            } catch (e) {
                return false;
            }
        }
        return this.addresses.length ? this.addresses[0] : null;
    };

    public newContract = async() => {
      try {
        const contract = new window.web3.eth.Contract(
            abi,
            address,
        );
        console.log(contract);
        const token = await contract.methods.Token().call();

        console.log("token",token)
        return token

}
catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage)

}
}





}
