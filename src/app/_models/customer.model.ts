import {Deserializable} from "./deserializable";

export class Customer implements Deserializable {
  public id: number;
  public name: string;
  public surname: string;
  public address: string;
  public prefArtistId: number;
  public prefArtistName: string;
  public prefArtistSurname: string;
  public phone: string;
  public prefType: string;
  public prefMedium: string;
  public prefStyle: string;
  public thisYearSelling: number = 0;
  public lastYearSelling: number = 0;

  deserialize(input: any): this {
    console.log('model: ' + input);
    this.thisYearSelling = 0;
    this.lastYearSelling = 0;
    return Object.assign(this, input);
  }

  getPrefArtistName(): string {
    if (this.prefArtistId)
      return this.prefArtistName + " " + this.prefArtistSurname
    else
      return ""
  }


  getName(): string {
    return this.name + " " + this.surname;
  }

  basicInfo(): string {
    return this.name + " " + this.surname + " (" + this.address + ")";
  }
}
