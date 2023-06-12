import {Deserializable} from "./deserializable";
import {Sale} from "./sale.model";

export class WeekSales implements Deserializable {
  public salespersonName : number;
  public salespersonSurname: string;
  public sales: Sale[];

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  getName(): string {
    return this.salespersonName + " " + this.salespersonSurname;
  }
}
