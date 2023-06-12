import {Deserializable} from "./deserializable";

export class Sale implements Deserializable {
  id: number;
  artworkId: number;
  artworkTitle: string;
  artistId: number;
  artistName: string;
  artistSurname: string;
  collectorId: number;
  collectorName: string;
  collectorSurname: string;
  customerId: number;
  customerName: string;
  customerSurname: string;
  salespersonId: number;
  spName: string;
  spSurname: string;
  date: string;
  sellingPrice:number;

  deserialize(input: any): this {
    console.log('model: ' + input);
    return Object.assign(this, input);
  }

  public getCustomerName(): string {
    return this.customerSurname + " " + this.customerName
  }

  public getArtistName(): string {
    return this.artistSurname + " " + this.artistName
  }

  getSpName(): string {
    return this.spSurname + " " + this.spName
  }


  public getCollectorName(): string {
    if(this.collectorSurname == null)
      return "N/A"
    return this.collectorSurname  + " " + this.collectorName
  }
}
