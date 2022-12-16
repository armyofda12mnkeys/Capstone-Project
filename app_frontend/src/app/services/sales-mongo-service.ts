import { Injectable } from '@angular/core';
import axios from 'axios';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesMongoService {

  constructor() { }
  
  async getRealSalesFromMongoDB() { 
    return this.getMockSalesFromMongoDB();
    const response = await axios({
      method: "get",
      url: environment.base_api_url + "/sales",
      headers: {
          "Content-Type": "application/json"
      },
    });
    
    console.log(response.data);
    //replace public gateway which is rate-limited to temporary private gateway
    response.data.map((sale:any)=>{
      const ipfs_hash = sale.ipfs_hash;
      if(ipfs_hash && ipfs_hash!=''){ //if uses new field (if clear db, everything should be using this)
        const ipfs_image_hash = sale.ipfs_hash;
        const new_ipfs_image_url = environment.PINATA_PRIVATE_GATEWAY + ipfs_image_hash;
        sale.image_ipfs_url = new_ipfs_image_url;
      } else { //if testing an old lottery/auction on the 15th demo, then may need to parse out from other link
        const ipfs_image_url = sale.image_ipfs_url;
        const ipfs_cid_hash = ipfs_image_url.split(environment.PINATA_PUBLIC_GATEWAY)[1];
        const new_ipfs_image_url = environment.PINATA_PRIVATE_GATEWAY + ipfs_cid_hash;
        sale.image_ipfs_url = new_ipfs_image_url;
      }      
    });
    console.log(response.data);
    //console.log(response[0].name_of_sale);
    return response.data;
    /*
    const response = await axios.get<AxiosPromise>(environment.base_api_url + '/sales')
    console.log(response.data);
    this.sales = response.data;
    */

  }

  getMockSalesFromMongoDB() { //change to get from MongoDB (directly or via NestJS BE service)
    return [
      
      {
        sale_contract_addr: '0xa935FEc75c0CB624C1A0A1149eeFB67D6D8284Eb',
        name_of_sale: 'Lottery#1',
        type_of_sale: 'lottery',
        description: 'This is Sale#1 ...',
        recipient: {
            recipient_name: 'Foundation#1',
            recipient_link: 'https://wwww.charity.com',
            recipient_desc: 'This is a great foundation we are donated proceeds to.',
            recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
        },
        closing_time: new Date('2022-06-06 6:06:06'),
        bet_price: 666,
        json_ipfs_hash: 'QmPC7PBSLNrRsbcZ8w13AzPMoKjCTqvyBBNHeBMQMiii8x',
        json_ipfs_url: 'https://apricot-known-vicuna-552.mypinata.cloud/ipfs/QmPC7PBSLNrRsbcZ8w13AzPMoKjCTqvyBBNHeBMQMiii8x',
        image_ipfs_hash: 'QmRChV22QG5CMzCHBbEPdpwyHbuMT5p972ZcranT38n6t6',
        image_ipfs_url: 'https://apricot-known-vicuna-552.mypinata.cloud/ipfs/QmRChV22QG5CMzCHBbEPdpwyHbuMT5p972ZcranT38n6t6',
    },

    {
      sale_contract_addr: '0xED406FcF689671242DD2c130a64D68Fd869BFa96',
      name_of_sale: 'Auction#1',
      type_of_sale: 'auction',
      description: 'This is Sale#2 ...',
      recipient: {
          recipient_name: 'Foundation#2',
          recipient_link: 'https://wwww.charity2.com',
          recipient_desc: 'This is a great foundation we are donated proceeds to.',
          recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
      },
      closing_time: new Date('2022-06-06 06:06:06'),
      starting_bid: 100,
      highest_bid: 200,
      json_ipfs_hash: 'QmX7YobVdS1inUorMPep6kRjtvms4qZrfGm9ji41BgqYur',
      json_ipfs_url: 'https://apricot-known-vicuna-552.mypinata.cloud/ipfs/QmX7YobVdS1inUorMPep6kRjtvms4qZrfGm9ji41BgqYur',
      image_ipfs_hash: 'QmWs9Lmeyx6kUw72FniSpzYejJgGs2GXn8ex6tY7Txokv2',
      image_ipfs_url: 'https://apricot-known-vicuna-552.mypinata.cloud/ipfs/QmWs9Lmeyx6kUw72FniSpzYejJgGs2GXn8ex6tY7Txokv2',
    },


    
    /*,

        {
          sale_contract_addr: '0x43dE11745093C958e68a1235FF100adF0ADF5aDf',
          name_of_sale: 'ArianLottery#5',
          type_of_sale: 'lottery',
          description: 'This is Sale#5 ...',
          recipient: {
              recipient_name: 'Foundation#1',
              recipient_link: 'https://wwww.charity.com',
              recipient_desc: 'This is a great foundation we are donated proceeds to.',
              recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
          },
          closing_time: new Date('2022-12-12 12:00:00'),
          bet_price: 111,
          json_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmQW4ByGLohr3KsKunMK9r94XLEWUaXiWiQcfxBsCFKn2v',
          image_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmYLxsmiuvPSdiQ6HsDhCGQY6LUEaHSGAQ5G2uKb9UcdRb'

      },

      {
        sale_contract_addr: '0x354Ad4A6028fE54962810125a11b6caf42BD8ECf',
        name_of_sale: 'ArianAuction#6',
        type_of_sale: 'auction',
        description: 'This is Sale#4 ...',
        recipient: {
            recipient_name: 'Foundation#4',
            recipient_link: 'https://wwww.charity.com',
            recipient_desc: 'This is a great foundation we are donated proceeds to.',
            recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
        },
        closing_time: new Date('2022-12-12 13:30:00'),
        starting_bid: 100,
        highest_bid: 200,
        json_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmYTF4T6gAbJEk9bNnjxyaF9RXxyCH7rQkM4Wmu7pF726p',
        image_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmeQo9yVvkV8kmNYgMHT5Dznweniq4gWXti9xrLp7WxPmv',
        

      },




      {
        sale_contract_addr: '0xd165025Ca6a9Bb27782Fc2b8Fa3d918E6aCeBA0d',
        name_of_sale: 'ArianLottery#1',
        type_of_sale: 'lottery',
        description: 'This is Sale#1 ...',
        recipient: {
            recipient_name: 'Foundation#1',
            recipient_link: 'https://wwww.charity.com',
            recipient_desc: 'This is a great foundation we are donated proceeds to.',
            recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
        },
        closing_time: new Date('2022-12-12 12:00:00'),
        bet_price: '111',
        json_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmV6hVupDrq3gsZnRv6K4kjnDPCkFhmexEWwMk4YPds1Bx',
        image_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmRChV22QG5CMzCHBbEPdpwyHbuMT5p972ZcranT38n6t6'

    },
    {
        sale_contract_addr: '0x36337568918e7DAa61EFA3a82DB5294711cd4F96',
        name_of_sale: 'ArianLottery#2',
        type_of_sale: 'lottery',
        description: 'This is Sale#2 ...',
        recipient: {
            recipient_name: 'Foundation#2',
            recipient_link: 'https://wwww.charity.com',
            recipient_desc: 'This is a great foundation we are donated proceeds to.',
            recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
        },
        closing_time: new Date('2022-12-12 12:30:00'),
        bet_price: '112',
        json_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmeQFj87HYb3pozsQHUKKYwRzYBbZcqfMLseNRNmSm5bVf',
        image_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmT4MEZw1bcMHvsVHCWk7g53RbjipKNYipKS4vATJo74hu'

    },
    {
        sale_contract_addr: '0xE3aE4DEF7A355C5230ffeA7150A5aEC4f6b63EaE',
        name_of_sale: 'ArianAuction#3',
        type_of_sale: 'auction',
        description: 'This is Sale#3 ...',
        recipient: {
            recipient_name: 'Foundation#3',
            recipient_link: 'https://wwww.charity.com',
            recipient_desc: 'This is a great foundation we are donated proceeds to.',
            recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
        },
        closing_time: new Date('2022-12-12 13:00:00'),
        highestBid: '200',
        json_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmSTNcxELHSmezWBYn9kWCaRWKZzTbye3aeT8ivgkDmiLY',
        highest_bid: 'https://gateway.pinata.cloud/ipfs/QmW9nAkdaQy8c2QcawZ5DbK4XHs4L729coa4hSn4U2TWgp'

    },
    {
      sale_contract_addr: '0xf548E007beB652ba8A43c999b58D504B06bf6FF7',
      name_of_sale: 'ArianAuction#4',
      type_of_sale: 'auction',
      description: 'This is Sale#4 ...',
      recipient: {
          recipient_name: 'Foundation#4',
          recipient_link: 'https://wwww.charity.com',
          recipient_desc: 'This is a great foundation we are donated proceeds to.',
          recipient_addr: '0xA2dd619dB59A3BDa94A39Ea3006396C7584294Ee'
      },
      closing_time: new Date('2022-12-12 13:30:00'),
      highest_bid: '200',
      json_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmZPCFmcoe2auUK7bvVJgFU2XjE1dkw93zCc2c5egPDATx',
      image_ipfs_url: 'https://gateway.pinata.cloud/ipfs/QmWs9Lmeyx6kUw72FniSpzYejJgGs2GXn8ex6tY7Txokv2',
      ipfs_hash: 'QmWs9Lmeyx6kUw72FniSpzYejJgGs2GXn8ex6tY7Txokv2'

    },
    */

    
    
    ];
  }
}
