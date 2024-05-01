import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Utilisateur} from '../models/utilisateur.model';
import {Token} from '../models/token.model';
import {LoginPassword} from "../models/login-password.model";
import {HttpClient} from "@angular/common/http";
import {ApplicationErreur} from "../models/application-erreur.model";

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	message = new BehaviorSubject(null as ApplicationErreur);

	messageErreur = this.message.asObservable();

	updateMessageErreur(applicationErreur: ApplicationErreur) {
		console.log('1 ', applicationErreur)
		this.message.next(applicationErreur);
	}
}
