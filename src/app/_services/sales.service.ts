import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Sale} from "../_models/sale.model";
import {Salesperson} from "../_models/salesperson.model";
import {WeekSales} from "../_models/week-sales.model";
import {Stub} from "../_models/stub.model";
const SALES_URL = 'http://localhost:8080/sales/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http : HttpClient) { }

  sellArtwork(sale: FormGroup): Observable<any> {
    return this.http.post(SALES_URL + 'add', {
        artworkId: sale.get('artworkId')!.value,
        customerId: sale.get('customerId')!.value,
        salespersonId: sale.get('salespersonId')!.value,
        date: sale.get('date')!.value,
        sellingPrice: sale.get('sellingPrice')!.value,
      },
      httpOptions);
  }

  getPastSales() : Observable<Sale[]> {
    return this.http.get<Sale[]>(SALES_URL + 'all', httpOptions).pipe(
      map(data => data.map(data => new Sale().deserialize(data)))
    );

  }

  getThisWeekSales() : Observable<WeekSales[]> {
    return this.http.get<WeekSales[]>(SALES_URL + 'thisWeek', httpOptions).pipe(
      map(data => data.map(data => new WeekSales().deserialize(data)))
    );

  }

  getStub(saleId: number) : Observable<Stub> {
    return this.http.get<Stub>(SALES_URL + saleId +'/paymentStub', httpOptions).pipe(
      map(data => new Stub().deserialize(data))
    );
  }
}
