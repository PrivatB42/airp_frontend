import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {NavigationService} from "./services/navigation.service";
import {MenuItem, Message, PrimeNGConfig} from "primeng/api";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {Utilisateur} from "./models/utilisateur.model";
import {ApplicationErreur} from "./models/application-erreur.model";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "./services/message-service.service";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, MenubarModule, InputTextModule, MessagesModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	applicationErreur: ApplicationErreur;
	items: MenuItem[]
	messages: Message[];
	utilisateurConnecte: Utilisateur;

	constructor(private authService: AuthService,
				private messageService: MessageService,
				private navigationService: NavigationService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		if (this.authService.isAuthenticated()) {
			this.utilisateurConnecte = this.authService.getUtilisateurConnecte();
		}
		else {
			this.navigationService.goTologin();
		}

		this.messageService.messageErreur.subscribe(
			(applicationErreur) => {
				this.applicationErreur = applicationErreur;
				if (this.applicationErreur) {
					this.messages = [{
						severity: this.applicationErreur.type.toLowerCase(),
						detail: this.applicationErreur.messageAvecCode
					}];
				}
			}
		);

		this.items = [
			{
				label: 'Accueil',
				icon: 'fa fa-home',
				routerLink: 'tableau-de-bord'
			},
			{
				label: 'Référentiel',
				icon: 'fa fa-align-left',
				routerLink: 'referentiel'
			},
			{
				label: 'Administration',
				icon: 'fa fa-cogs',
				routerLink: 'administration',
			}
		];
		this.primeNgConfig.setTranslation({
			dayNames: ['Dimanche',
				'Lundi',
				'Mardi',
				'Mercredi',
				'Jeudi',
				'Vendredi',
				'Samedi'],
			dayNamesShort: ['Dim.',
				'Lun.',
				'Mar.',
				'Mer.',
				'Jeu.',
				'Ven.',
				'Sam.'],
			dayNamesMin: ['Di',
				'Lu',
				'Ma',
				'Me',
				'Je',
				'Ve',
				'Sa'],
			monthNames: ['Janvier',
				'Fevrier',
				'Mars',
				'Avril',
				'Mai',
				'Juin',
				'Juillet',
				'Août',
				'Septembre',
				'Octobre',
				'Novembre',
				'Decembre'],
			monthNamesShort: ['Janv.',
				'Fevr.',
				'Mars',
				'Avri.',
				'Mai',
				'Juin',
				'Juil.',
				'Août',
				'Sept.',
				'Octo.',
				'Novem.',
				'Decem.']
		});
	}

	/**
	 * Retourne true si la page de connexion est affichée.
	 */
	isLogin(): boolean {
		return this.navigationService.isLogin();
	}

	/**
	 * Déconnecte l'utilisateur connecté et redirige vers la page d'authentification.
	 */
	deconnecter(): void {
		localStorage.removeItem('access_token');
		this.navigationService.goTologin();
	}
}
