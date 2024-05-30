import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JsonService {
    private urlGeojsonPaysDuMonde = '../../../assets/geojson/countries.geojson'

    constructor(private http: HttpClient) {
    }

    /**
     * @returns le geojson de tous les pays du monde
     */
    getPaysDuMonde(): Observable<any> {
        return this.http.get<JSON>(this.urlGeojsonPaysDuMonde);
    }

    /**
     * @returns le geoson de la Côte d'Ivoire
     */
    // getCotedIvoire(): Observable<any> {
    //     return this.http.get<JSON>(this.urlGeojsonCiv);
    // }

}