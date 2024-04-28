import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pharmacie} from "../models/pharmacie.model";

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {
	private baseUrl = '/ws/pharmacie';

  constructor(private http: HttpClient,) { }

	lister(): Observable<Pharmacie[]> {
	  return this.http.get<Pharmacie[]>(`${this.baseUrl}/lister`);
	}
}
