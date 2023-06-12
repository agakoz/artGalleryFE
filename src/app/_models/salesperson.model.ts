import {Deserializable} from "./deserializable";

export class Salesperson implements Deserializable {
  public id : number;
  public name: string;
  public surname: string;
  public ssn: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  basicInfo() : string {
    return  this.name + " " + this.surname + " (" + this.ssn + ")" ;
  }

  getName(): string {
    return this.name + " " + this.surname;
  }
}
