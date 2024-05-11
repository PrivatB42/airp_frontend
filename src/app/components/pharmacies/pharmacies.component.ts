import {Component, OnInit} from '@angular/core';
import {Pharmacie} from "../../models/pharmacie.model";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PharmaciesService} from "../../services/pharmacies.service";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "../../services/message-service.service";
import {FileUploadEvent, FileUploadModule} from "primeng/fileupload";

@Component({
  selector: 'app-pharmacies',
  standalone: true,
	imports: [
		TableModule,
		ButtonModule,
		RippleModule,
		FileUploadModule,
	],
  templateUrl: './pharmacies.component.html',
  styleUrl: './pharmacies.component.scss'
})
export class PharmaciesComponent implements OnInit{
	pharmacies: Pharmacie[];
	urlImport: string;
	constructor(private pharmacieService: PharmaciesService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		this.recupererPharmacies();
		this.urlImport = this.pharmacieService.importPharmacieUrl;
	}

	/**
	 * Récupère la liste des pharmacies
	 */
	recupererPharmacies(): void {
		this.pharmacieService.lister().subscribe(
			(pharmacies) => {
				this.pharmacies = pharmacies;
			},
			(error) => {
				this.messageService.updateMessageErreur(error.error);
			}
		);
	}

	onUpload($event: FileUploadEvent): void {
		this.recupererPharmacies();
	}
}
