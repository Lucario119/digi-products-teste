import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonURL = '/src/assets/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.jsonURL);
  }
}
