import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Utilisateur} from '../models/utilisateur.model';
import {Token} from '../models/token.model';
import {LoginPassword} from "../models/login-password.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private url = '/ws/securite';

	constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
	}

	static updateAccessToken(token: string): void {
		localStorage.removeItem('access_token');
		localStorage.setItem('access_token', token);
	}

	/**
	 * Retourne l'utilisateur connecté.
	 */
	getUtilisateurConnecte(): Utilisateur {
		if (this.isAuthenticated()) {
			const  utilisateur = new Utilisateur();
			const token = this.jwtHelper.decodeToken(this.getToken());

			utilisateur.id = token.id;
			utilisateur.nom = token.nom;
			utilisateur.prenoms = token.prenoms;

			return utilisateur;
		}
		return null;
	}

	/**
	 * Authentifie l'utilisateur.
	 *
	 * @param loginPassword l'objet contenant le login et le mot de passe de l'utilisateur.
	 * @return le {@link Token} de l'utilisateur authentifié.
	 */
	authentifier(loginPassword: LoginPassword): Observable<Token> {
		return this.http.post<Token>(this.url + '/auth', loginPassword);
	}

	/**
	 * Vérifie si l'utilisateur est authentifié et si le token est toujours valide.
	 * @private
	 */
	isAuthenticated(): boolean {
		const token = localStorage.getItem('access_token');
		if (token) {
			return !this.jwtHelper.isTokenExpired(token);
		}
		return false;
	}

	private getToken(): string {
		const token = localStorage.getItem('access_token');
		return token ? token : '';
	}
}
