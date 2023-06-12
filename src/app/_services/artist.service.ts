import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Artist} from "../_models/artist.model";
import {FormGroup} from "@angular/forms";
import {Artwork} from "../_models/artwork.model";

const ARTISTS_URL = 'http://localhost:8080/artist/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {
  }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(ARTISTS_URL + 'all', httpOptions).pipe(
      map(data => data.map(data => new Artist().deserialize(data)))
    );
  }

  getActiveAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(ARTISTS_URL + 'activeArtists', httpOptions).pipe(
      map(data => data.map(data => new Artist().deserialize(data)))
    );
  }

  getPatient(id: number | string): Observable<Artist> {
    return this.http.get<Artist>(ARTISTS_URL + id, httpOptions).pipe(
      map(data => new Artist().deserialize(data))
    );
  }

  addArtist(artist: FormGroup): Observable<any> {
    return this.http.post(ARTISTS_URL + 'add', {
        name: artist.get('name')!.value,
        surname: artist.get('surname')!.value,
        address: artist.get('address')!.value,
        phone: artist.get('phone')!.value,
        ssn: artist.get('ssn')!.value,
        usualType: artist.get('usualType')!.value,
        usualMedium: artist.get('usualMedium')!.value,
        usualStyle: artist.get('usualStyle')!.value
      },
      httpOptions);
  }

  checkArtistSSNExist(ssn: string) {
    return this.http.post<boolean>(ARTISTS_URL + 'artistExist', {
      ssnValue: ssn
    });
  }

  getArtistsBasicInfo() {
    return this.http.get<Artist[]>(ARTISTS_URL + 'basicInfo', httpOptions).pipe(
      map(data => data.map(data => new Artist().deserialize(data)))
    );
  }

  removeArtist(id: number) {
    return this.http.get<boolean>(ARTISTS_URL + 'delete/' + id);
  }

  updateArtist(artist: FormGroup): Observable<any> {
    return this.http.post(ARTISTS_URL + 'update', {
        id: artist.get('id')!.value,
        name: artist.get('name')!.value,
        surname: artist.get('surname')!.value,
        address: artist.get('address')!.value,
        phone: artist.get('phone')!.value,
        ssn: artist.get('ssn')!.value,
        usualType: artist.get('usualType')!.value,
        usualMedium: artist.get('usualMedium')!.value,
        usualStyle: artist.get('usualStyle')!.value
      },
      httpOptions);
  }

  validateArtistSSNExist(id: any, ssn: any) {
    return this.http.post<boolean>(ARTISTS_URL + 'validateSSN', {
      id: id,
      ssnValue: ssn
    });
  }
  getArtworksFromArtist(id: number): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(ARTISTS_URL + id + '/artworks').pipe(
      map(data => data.map(data => new Artwork().deserialize(data)))
    );

  }
}
