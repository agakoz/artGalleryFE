import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const FILE_URL = 'http://localhost:8080/files/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  addFile(file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(
      FILE_URL + 'upload',
      formData,
      {responseType: 'text'}
    );

  }

  downloadFile(fileId: number): Observable<any>{
    let hdrs = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get( FILE_URL + 'download/' + fileId,  {headers: hdrs, observe: 'response', responseType: 'blob'});
  }
}
