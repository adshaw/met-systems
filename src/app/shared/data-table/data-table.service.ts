import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IMetSystem} from './table-model';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  sendPostRequest(data: IMetSystem[]): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.baseURL + 'posts', body, {'headers': headers});
  }
}
