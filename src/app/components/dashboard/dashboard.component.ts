import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessageService} from "../../services/message-service.service";
import {LoginPassword} from "../../models/login-password.model";

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


	constructor(private authService: AuthService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		// TODO à retirer (ce code sera utilisé comme exemple d'affichage d'erreur)
		this.authService.authentifier(new LoginPassword({username: 'azerty', password: 'azerty'})).subscribe({
			next: () => console.log('Ok ...'),
			error: (erreur) => {
				this.messageService.updateMessageErreur(erreur.error);
			}
		})
	}
}
