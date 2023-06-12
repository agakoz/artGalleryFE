import {Deserializable} from "./deserializable";

export class Artist implements Deserializable {
  public id : number;
  public name: string;
  public surname: string;
  public address: string;
  public phone: string;
  public ssn: string;
  public usualType: string;
  public usualMedium: string;
  public usualStyle: string;
  public thisYearSelling: number = 0;
  public lastYearSelling: number = 0 ;



  deserialize(input: any): this {
    console.log('model: ' + input);
    return Object.assign(this, input);
  }

  getName(): string {
    return this.name + " " + this.surname;
  }

  basicInfo() : string {
   return  this.name + " " + this.surname + " (" + this.ssn + ")" ;
  }
}
