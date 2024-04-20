import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {NavigationService} from "./services/navigation.service";
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, MenubarModule, InputTextModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	items: MenuItem[]

	constructor(private navigationService: NavigationService,
				private authService: AuthService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		// this.utilisateurConnecte = this.authService.getUtilisateurConnecte();
		this.items = [
			{
				label: 'Accueil',
				icon: 'fa fa-home',
				routerLink: 'tableau-de-bord'
			},
			{
				label: 'Administration',
				icon: 'fa fa-cogs',
				routerLink: 'administration'
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
}
