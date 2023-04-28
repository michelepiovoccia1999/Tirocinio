import { Injectable } from '@angular/core';
import Web3 from "web3";

declare const window: any;

const address ='0x5a0de6DD5090a48c19329589eA609adb25447Cb3';
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
        console.log("PROVIDER", window.web3.eth.givenProvider)
        console.log("ADRESS",window.web3.utils.toChecksumAddress(address))


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
