import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Artist} from "../_models/artist.model";
import {Artwork} from "../_models/artwork.model";
import {Customer} from "../_models/customer.model";

const ARTWORK_URL = 'http://localhost:8080/artwork/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  constructor(private http: HttpClient) {
  }

  getAllArtworksOnSale(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(ARTWORK_URL + 'onSale', httpOptions).pipe(
      map(data => data.map(data => new Artwork().deserialize(data)))
    );
  }

  checkArtistTitleExist(artistId: number, title: string) {
    return this.http.post<boolean>(ARTWORK_URL + 'artistExist', {
      artistId: artistId,
      artworkTitle: title
    });
  }

  addArtwork(artwork: FormGroup): Observable<any> {
    return this.http.post(ARTWORK_URL + 'add', {
        title: artwork.get('title')!.value,
        artType: artwork.get('artType')!.value,
        size: artwork.get('size')!.value,
        artMedium: artwork.get('artMedium')!.value,
        artStyle: artwork.get('artStyle')!.value,
        askingPrice: artwork.get('askingPrice')!.value,
        artistId: artwork.get('artistId')!.value,
        collectorId: artwork.get('collectorId') ? artwork.get('collectorId')!.value : null,
        fileId: artwork.get('fileId') ? artwork.get('fileId')!.value : null,
      }
    );
  }

  removeArtwork(id: number) {
    return this.http.get(ARTWORK_URL + 'delete/' + id)
  }


  getInterestedCustomers(artworkId: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(ARTWORK_URL + artworkId + "/interestedCustomers", httpOptions).pipe(
      map(data => data.map(data => new Customer().deserialize(data)))
    );
  }

  updateArtwork(artwork: FormGroup): Observable<any> {
    return this.http.post(ARTWORK_URL + 'update', {
        id: artwork.get('id')!.value,
        title: artwork.get('title')!.value,
        artType: artwork.get('artType')!.value,
        size: artwork.get('size')!.value,
        artMedium: artwork.get('artMedium')!.value,
        artStyle: artwork.get('artStyle')!.value,
        askingPrice: artwork.get('askingPrice')!.value,
        artistId: artwork.get('artistId')!.value,
        collectorId: artwork.get('collectorId') ? artwork.get('collectorId')!.value : null,
        fileId: artwork.get('fileId') ? artwork.get('fileId')!.value : null,
      }
    );
  }
}
