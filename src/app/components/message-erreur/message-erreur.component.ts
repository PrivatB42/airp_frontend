import {Component, Input} from '@angular/core';
import {MessagesModule} from "primeng/messages";
import {ApplicationErreur} from "../../models/application-erreur.model";
import {Message} from "primeng/api";

@Component({
	selector: 'app-message-erreur',
	standalone: true,
	imports: [
		MessagesModule
	],
	templateUrl: './message-erreur.component.html',
	styleUrl: './message-erreur.component.scss'
})
export class MessageErreurComponent {
	@Input() applicationMessage: ApplicationErreur;
	message: Message[];

	formaterMessage(): Message[] {
		if (this.applicationMessage) {
			return [{
				severity: this.applicationMessage.type,
				summary: 'Error',
				detail: this.applicationMessage.messageAvecCode
			}];
		}
		return [];
	}
}
