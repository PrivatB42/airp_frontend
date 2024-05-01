import {Component, OnInit} from '@angular/core';
import {Pharmacie} from "../../models/pharmacie.model";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PharmaciesService} from "../../services/pharmacies.service";

@Component({
  selector: 'app-pharmacies',
  standalone: true,
	imports: [
		TableModule,
		ButtonModule
	],
  templateUrl: './pharmacies.component.html',
  styleUrl: './pharmacies.component.scss'
})
export class PharmaciesComponent implements OnInit{
	pharmacies: Pharmacie[];

	constructor(private pharmacieService: PharmaciesService) {
	}

	ngOnInit(): void {
		this.rechercherPharmacies();
	}

	rechercherPharmacies(): void {
		this.pharmacieService.lister().subscribe(
			(pharmacies) => {
				console.log();
				this.pharmacies = pharmacies;
			},
			(error) => {
				console.error('Une erreur s\'est produite : ', error);
			}
		);
	}
}
