import {Deserializable} from "./deserializable";

export class Stub implements Deserializable  {
  public artistName: string;
  public artistSurname: string;
  public artistAddress: string;
  public artistSSN: string;
  public artworkTitle: string;
  public type: string;
  public medium: string;
  public style: string;
  public size: string;
  public salespersonName: string;
  public salespersonSurname: string;
  public sellingPrice: number;
  public amountRemitted: number;


  deserialize(input: any): this {
    console.log('model: ' + input);
    return Object.assign(this, input);
  }
}
