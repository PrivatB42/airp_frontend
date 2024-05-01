import {Component, OnInit} from '@angular/core';
import {VersionService} from "../../services/version.service";
import {Version} from "../../models/version.model";
import {MessageService} from "../../services/message-service.service";
import {CommonModule, NgIf} from "@angular/common";

@Component({
	selector: 'app-administration',
	standalone: true,
	imports: [
		CommonModule
	],
	templateUrl: './administration.component.html',
	styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements OnInit {

	version: Version;

	constructor(private versionService: VersionService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		this.versionService.recupererVersionEtSha1().subscribe({
			next: (data) => this.version = data,
			error: (error) => this.messageService.updateMessageErreur(error.error)
		});
	}
}
