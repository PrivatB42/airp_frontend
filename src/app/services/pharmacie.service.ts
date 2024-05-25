import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Pharmacie} from "../models/pharmacie.model";
import {Observable} from "rxjs";


@Injectable({
	providedIn: 'root'
})
export class PharmacieService {
	private url = '/ws/pharmacie';

	constructor(private http: HttpClient) {
	}

	/**
	 * Retourne la liste des pharmacies.
	 */
	listerPharmacies(): Observable<Pharmacie[]> {
		return this.http.get<Pharmacie[]>(this.url + '/lister');
	}
}
