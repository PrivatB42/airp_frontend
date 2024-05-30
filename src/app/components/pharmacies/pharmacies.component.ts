import {Component, OnInit, ViewChild} from '@angular/core';
import {Pharmacie} from "../../models/pharmacie.model";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PharmaciesService} from "../../services/pharmacies.service";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "../../services/message-service.service";
import {InputTextModule} from "primeng/inputtext";
import { ModalImportComponent } from "./modal-import/modal-import.component";
import { ModalImportComponent } from "./modal-import/modal-import.component";

@Component({
  selector: 'app-pharmacies',
  standalone: true,
	imports: [
		TableModule,
		ButtonModule,
		RippleModule,
		InputTextModule,
		ModalImportComponent
	],
  templateUrl: './pharmacies.component.html',
  styleUrl: './pharmacies.component.scss'
})
export class PharmaciesComponent implements OnInit{
	@ViewChild(ModalImportComponent) modalImport!: ModalImportComponent;
	private readonly SEPARATEUR_CSV = ',';
	pharmacies: Pharmacie[];
	constructor(private pharmacieService: PharmaciesService,
				private messageService: MessageService) {
	}

	ngOnInit(): void {
		this.recupererPharmacies();
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

	/**
	 * Ouvre la modale d'import
	 */
	ouvrirModalImport() {
		this.modalImport.ouvrePopup();
	}

	onImportSucces() {
		this.recupererPharmacies();
		this.modalImport.cacherPopup();
	}

	/**
	 * Exporte le template du CSV utilisé pour l'import des pharmacies
	 */
	exporterTemplatePharmacie(): void{
		const pharmacie = new Pharmacie().deserialize({
			numero: '5588',
			nom: 'Sainte Famille',
			ville: 'Abidjan',
			quartier: 'Riviera 3',
			heureOuverture: [7, 30],
			heureFermeture: [19, 0],
			nomGerant: 'Dr Camille Kouassi',
			contact: '0102030405',
			longitude: '-3.967334690713763',
			latitude: '5.3556885154656735'
		});

		const data = [
			{ 'numero': pharmacie.numero },
			{ 'nom': pharmacie.nom },
			{ 'ville': pharmacie.ville },
			{ 'quartier': pharmacie.quartier },
			{ 'heureOuverture': pharmacie.heureOuvertureFormate() },
			{ 'heureFermeture': pharmacie.heureFermetureFormate() },
			{ 'gerant': pharmacie.nomGerant },
			{ 'contact': pharmacie.contact },
			{ 'longitude': pharmacie.longitude },
			{ 'latitude': pharmacie.latitude }
		];

		// On construit les ligne d'entête et de données
		const dataLine: string[] = [];
		const allKeys = data.reduce((keys, item: any) => {
			Object.keys(item).forEach(key => {
				if (!keys.includes(key)) {
					keys.push(key);
					dataLine.push(item[key]);
				}
			});
			return keys;
		}, [] as string[]);

		// On construit le contenu du fichier
		const headerLine = allKeys.join(this.SEPARATEUR_CSV);
		const csvLines = dataLine.join(this.SEPARATEUR_CSV);
		const csvContent = [headerLine, csvLines].join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

		//On construit le fichier
		const link = document.createElement("a");
		link.setAttribute("href", URL.createObjectURL(blob));
		link.setAttribute("download", "modele_import_pharmacie.csv");
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
