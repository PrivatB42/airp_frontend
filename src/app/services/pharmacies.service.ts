import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Pharmacie} from "../models/pharmacie.model";

@Injectable({
	providedIn: 'root'
})
export class PharmaciesService {
	baseUrl = '/ws/pharmacie';
	importPharmacieUrl = this.baseUrl + '/import';

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère la liste des pharmacies.
	 */
	lister(): Observable<Pharmacie[]> {
		return this.http.get<Pharmacie[]>(`${this.baseUrl}/lister`).pipe(
			map(pharmacies => pharmacies.map(
				pharmacie => new Pharmacie().deserialize(pharmacie)))
		);
	}
}
