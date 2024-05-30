import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
	FileBeforeUploadEvent,
	FileSendEvent,
	FileUploadErrorEvent,
	FileUploadEvent,
	FileUploadModule,
	UploadEvent,
} from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { PharmaciesService } from '../../../services/pharmacies.service';
import { MessageService } from '../../../services/message-service.service';
import { CommonModule } from '@angular/common';
import { MessageService as ToastService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Pharmacie } from '../../../models/pharmacie.model';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
	selector: 'modal-import',
	standalone: true,
	imports: [
		CommonModule,
		FileUploadModule,
		DialogModule,
		ToastModule,
		ProgressSpinnerModule,
		TableModule,
		FieldsetModule,
	],
	templateUrl: './modal-import.component.html',
	styleUrl: './modal-import.component.css',
	providers: [MessageService, ToastService],
})
export class ModalImportComponent implements OnInit {
	@Output() statusImport = new EventEmitter<string>();

	affichePopup: boolean = false;
	urlImport: string;
	fichierUploaded: any;
	fichiers: any[] = [];
	lignesNonEnregistrees: Pharmacie[] = [];
	entetesLignesNonEnregistrees: string[] = [];
	loading: any;

	constructor(
		private toastService: ToastService,
		private messageService: MessageService,
		private pharmacieService: PharmaciesService
	) {}

	ngOnInit(): void {
		this.urlImport = this.pharmacieService.importPharmacieUrl;
	}

	/**
	 * Notifie le composant parent que l'upload des fichiers est terminé
	 *
	 * @param $event evenement déclenché après l'upload des fichiers
	 */
	onUpload($event: FileUploadEvent): void {
		const event: HttpEvent<any> = $event.originalEvent;
		this.loading = false;
		if (event instanceof HttpResponse) {
			if (event.body === null) {
				this.statusImport.emit();
				this.toastService.add({
					severity: 'success',
					summary: `Fichier ${$event.files[0].name} uploadé avec succès !`,
					detail: '',
				});
				this.cacherPopup();
			} else {
				this.lignesNonEnregistrees = event.body.filter(
					(el: any) => el != null
				); 
				this.entetesLignesNonEnregistrees = Object.keys(
					this.lignesNonEnregistrees[0]
				).slice(0,-2); // retire les valeurs Latitude et Longitude
			}
		}
	}

	/**
	 * Affiche un message d'erreur lorsque l'upload des fichiers échoue
	 *
	 * @param $event evenement déclenché après l'upload des fichiers
	 */
	onUploadError($event: FileUploadErrorEvent): void {
		this.loading = false;
		this.toastService.add({
			severity: 'error',
			summary: `❌ Impossible d'importer ${$event.files[0].name}!`,
		});
		this.messageService.updateMessageErreur($event.error.error);
	}

	/**
	 * ouvre la poppup.
	 */
	ouvrePopup() {
		this.affichePopup = true;
	}

	/**
	 * Ferme la popup.
	 */
	cacherPopup() {
		this.affichePopup = false;
		this.entetesLignesNonEnregistrees = null;
		this.lignesNonEnregistrees = null;
	}
}
