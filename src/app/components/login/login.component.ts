import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginPassword} from "../../models/login-password.model";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavigationService} from "../../services/navigation.service";
import {MessageErreurComponent} from "../message-erreur/message-erreur.component";
import {ApplicationErreur} from "../../models/application-erreur.model";
import {MessageModule} from "primeng/message";
import {Message} from "primeng/api";
import {MessagesModule} from "primeng/messages";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		CheckboxModule,
		InputTextModule,
		ButtonModule,
		RippleModule,
		ReactiveFormsModule,
		MessageErreurComponent,
		MessageModule,
		MessagesModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	formAuthentification = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', Validators.required),
	});
	applicationErreur: ApplicationErreur;
	loading = false;
	messages: Message[];
	submitted = false;

	constructor(private authService: AuthService,
				private navigationService: NavigationService) {
	}

	ngOnInit(): void {
		if (this.authService.isAuthenticated()) {
			this.navigationService.goToDashbord();
		}
	}

	/**
	 * Authentifie un utilisateur.
	 */
	authentifier() {
		this.submitted = true;
		if (this.formAuthentification.valid) {
			this.loading = true;
			this.authService.authentifier(new LoginPassword(this.formAuthentification.value)).subscribe({
				next: (data) => {
					AuthService.updateAccessToken(data.token);
					this.navigationService.goToDashbord();
				},
				error: (error) => {
					this.submitted = false;
					this.loading = false;
					this.applicationErreur = error.error;
					this.messages = [{
						severity: this.applicationErreur.type.toLowerCase(),
						detail: this.applicationErreur.messageAvecCode
					}];
				}
			});
		}
	}

	/**
	 * Retourne true si la saisie est invalide.
	 *
	 * @param nomDuChamp le champ de saisie contrôlé.
	 * @return true si la saisie est invalide.
	 */
	isSaisieInvalide(nomDuChamp: string): boolean {
		return this.submitted && this.formAuthentification.get(nomDuChamp).invalid;
	}
}
