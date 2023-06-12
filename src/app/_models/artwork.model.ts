import {Deserializable} from "./deserializable";

export class Artwork implements Deserializable{
  id: number;
  title: string;
  artistId: string;
  artistName: string;
  artistSurname: string;
  size: string;
  artType: string;
  artMedium: string;
  artStyle: string;
  askingPrice: string;
  collectorId: string;
  collectorName: string;
  collectorSurname: string;
  date: Date;
  sellingPrice: number;
  fileId: number
  fileName: string

  deserialize(input: any): this {
    console.log('model: ' + input);
    return Object.assign(this, input);
  }

}
