import { Injectable } from '@angular/core';
import {Artist} from "../_models/artist.model";
import {map, Observable} from "rxjs";
import {Collector} from "../_models/collector.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

const COLLECTOR_URL = 'http://localhost:8080/collector/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<Collector[]>{
    return this.http.get<Artist[]>(COLLECTOR_URL + 'all', httpOptions).pipe(
      map(data => data.map(data => new Artist().deserialize(data)))
    );
  }

  getCollectorOwners() {
    return this.http.get<Artist[]>(COLLECTOR_URL + 'collectorOwners', httpOptions).pipe(
      map(data => data.map(data => new Artist().deserialize(data)))
    );
  }

  checkCollectorSSNExist(ssn: string) {
    return this.http.post<boolean>(COLLECTOR_URL + 'collectorExist', {
      ssnValue : ssn
    });
  }

  addCollector(collector: FormGroup) {
    return this.http.post(COLLECTOR_URL + 'add', {
        name: collector.get('name')!.value,
        surname: collector.get('surname')!.value,
        address: collector.get('address')!.value,
        phone: collector.get('phone')!.value,
        ssn: collector.get('ssn')!.value,
      },
      httpOptions);
  }

  removeCollector(id: number) {
    return this.http.get<boolean>(COLLECTOR_URL + 'delete/' + id,);
  }
  update(collector: FormGroup): Observable<any> {
    return this.http.post(COLLECTOR_URL + 'update', {
        id: collector.get('id')!.value,
        name: collector.get('name')!.value,
        surname: collector.get('surname')!.value,
        address: collector.get('address')!.value,
        phone: collector.get('phone')!.value,
        ssn: collector.get('ssn')!.value,
      },
      httpOptions);
  }

  validateSSNExist(id: any, ssn: any) {
    return this.http.post<boolean>(COLLECTOR_URL + 'validateSSN', {
      id: id,
      ssnValue: ssn
    });
  }
}
