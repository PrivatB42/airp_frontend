import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Version} from "../models/version.model";

@Injectable({
	providedIn: 'root'
})
export class VersionService {
	private baseUrl = '/ws/version';

	constructor(private http: HttpClient) {}

	recupererVersionEtSha1(): Observable<Version> {
		return this.http.get<Version>(`${this.baseUrl}`);
	}
}
