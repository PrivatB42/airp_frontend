import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginPassword} from "../../models/login-password.model";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {CustomValidators} from "../../validators/custom-validators";
import {NavigationService} from "../../services/navigation.service";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		CommonModule,
		CheckboxModule,
		InputTextModule,
		ButtonModule,
		RippleModule,
		ReactiveFormsModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	formAuthentification = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', Validators.required),
	});
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
			this.authService.authentifier(new LoginPassword(this.formAuthentification.value)).subscribe({
				next: (data) => {
					AuthService.updateAccessToken(data.token);
					this.navigationService.goToDashbord();
				},
				error: (error) => {
					this.submitted = false;
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
