import { Component, OnInit } from '@angular/core';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ContractService } from 'src/app/services/contract-service';
import { environment } from 'src/environments/environment';

import { SalesMongoService} from '../../services/sales-mongo-service';

interface Sales {
  results: LotteryOrAuctionSale[]
}
interface LotteryOrAuctionSale {
    "_id": string
    "sale_contract_addr": string
    "name_of_sale": string
    "type_of_sale": string
    "description": string    
    "recipient": Recipient
    "closing_time": string
    "bet_price": string
    "image_ipfs_url": string
    "__v": number
}
interface Recipient {
  "recipient_name": string
  "recipient_desc": string
  "recipient_addr": string
  "_id": string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sales: any;
  public showModal: boolean = false;

  constructor(private salesMongoService: SalesMongoService, private contractService: ContractService) { }

  async ngOnInit() {    
    const sales = await this.salesMongoService.getRealSalesFromMongoDB(); //add await here later as it'll prob become a promise
    this.sales = sales;
    //get highestBid from Blockchain
    //const salesContract = ContractService.getContract(this.provider, this.signer, salesFactoryInterface.abi, environment.salesFactoryContractAddress, true);
    //this.contractService.launchLottery(salesContract, bet_price, payment_token, ipfs_nft_meta_url, recipient_addr, converted_to_seconds_after_epoch);

  }

}
