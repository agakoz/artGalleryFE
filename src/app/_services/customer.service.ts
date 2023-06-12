import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Artist} from "../_models/artist.model";
import {Customer} from "../_models/customer.model";

const CUSTOMER_URL = 'http://localhost:8080/customer/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(CUSTOMER_URL + 'all', httpOptions).pipe(
      map(data => data.map(data => new Customer().deserialize(data)))
    );
  }
  addCustomer(customer: FormGroup): Observable<any> {
    return this.http.post(CUSTOMER_URL + 'add', {
        name: customer.get('name')!.value,
        surname: customer.get('surname')!.value,
        address: customer.get('address')!.value,
        phone: customer.get('phone')!.value,
        prefType: customer.get('prefType')!.value,
        prefMedium: customer.get('prefMedium')!.value,
        prefStyle: customer.get('prefStyle')!.value,
        prefArtist: customer.get('prefArtist')!.value,
      },
      httpOptions);
  }

  checkCustomerAddressExist(id:number, name: string, surname: string, address: string) {
    return this.http.post<boolean>(CUSTOMER_URL + 'customerExist', {
      id : id,
      name : name,
      surname : surname,
      address : address
    });
  }

  getCustomerBasicInfo() {
    return this.http.get<Customer[]>(CUSTOMER_URL + 'basicInfo', httpOptions).pipe(
      map(data => data.map(data => new Customer().deserialize(data)))
    );
  }

  removeCustomer(id: number) {
    return this.http.get<boolean>(CUSTOMER_URL + 'delete/' + id, );
  }

  validateIdSSNExist(id: any, ssn: any) {
    return this.http.post<boolean>(CUSTOMER_URL + 'validateSSN', {
      id: id,
      ssnValue: ssn
    });
  }

  update(customer: FormGroup) : Observable<any> {
    return this.http.post(CUSTOMER_URL + 'update', {
        id: customer.get('id')!.value,
        name: customer.get('name')!.value,
        surname: customer.get('surname')!.value,
        address: customer.get('address')!.value,
        phone: customer.get('phone')!.value,
        prefType: customer.get('prefType')!.value,
        prefMedium: customer.get('prefMedium')!.value,
        prefStyle: customer.get('prefStyle')!.value,
        prefArtist: customer.get('prefArtist')!.value,
      },
      httpOptions);
  }
}
