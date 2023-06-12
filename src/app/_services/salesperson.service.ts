import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Customer} from "../_models/customer.model";
import {Artist} from "../_models/artist.model";
import {Salesperson} from "../_models/salesperson.model";
import {FormGroup} from "@angular/forms";

const SALESPERSON_URL = 'http://localhost:8080/salesperson/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class SalespersonService {

  constructor(private http: HttpClient) { }

  getAllSalespersons(): Observable<Salesperson[]> {
    return this.http.get<Salesperson[]>(SALESPERSON_URL + 'all', httpOptions).pipe(
      map(data => data.map(data => new Salesperson().deserialize(data)))
    );
  }
  addSalesperson(customer: FormGroup): Observable<any> {
    return this.http.post(SALESPERSON_URL + 'add', {
        name: customer.get('name')!.value,
        surname: customer.get('surname')!.value,
        ssn: customer.get('ssn')!.value,
      },
      httpOptions);
  }
  checkSalespersonSSNExist(ssn: string) {
    return this.http.get<boolean>(SALESPERSON_URL + 'exists/' + ssn)
  }

  delete(id: number) {
    return this.http.get(SALESPERSON_URL + 'delete/' + id, httpOptions)
  }

  validateSalespersonSSNExist(id: any, ssn: any) {
    return this.http.post<boolean>(SALESPERSON_URL + 'validateSSN', {
      id: id,
      ssnValue: ssn
    });
  }

  updateArtist(salesperson: FormGroup) : Observable<any> {
    return this.http.post(SALESPERSON_URL + 'update', {
        id: salesperson.get('id')!.value,
        name: salesperson.get('name')!.value,
        surname: salesperson.get('surname')!.value,
        ssn: salesperson.get('ssn')!.value
      },
      httpOptions);
  }

  getSaleAmtInPeriod(id: number, beginDate: any, endDate: any) : Observable<any>{
    return this.http.get(SALESPERSON_URL +id+ '/saleAmt/' + beginDate + "/" + endDate, httpOptions)

  }


  getSoldArtInPeriod(id: number, beginDate: any, endDate: any) : Observable<any>{
    return this.http.get(SALESPERSON_URL +id + '/soldArt/' + beginDate + "/" + endDate, httpOptions)

  }
}
