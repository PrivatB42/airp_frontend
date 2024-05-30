import { CommonModule } from "@angular/common";
import { AfterViewInit, Component } from '@angular/core';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import * as geojson from 'geojson';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToastModule } from "primeng/toast";
import { finalize } from "rxjs";
import RegionGeojson from "../../../assets/geojson/RegionGeojson.json";
import { Coordonnees } from "../../models/coordonnees";
import { Pharmacie } from "../../models/pharmacie.model";
import { MessageService } from "../../services/message-service.service";
import { PharmacieService } from "../../services/pharmacie.service";

@Component({
	selector: 'app-carte-interactive',
	standalone: true,
	imports: [CommonModule, ProgressSpinnerModule, ToastModule, LeafletMarkerClusterModule],
	templateUrl: './carte-interactive.component.html',
	styleUrl: './carte-interactive.component.scss'
})
export class CarteInteractiveComponent implements AfterViewInit {
	loading = true;

	// Données pharmacie
	pharmacies: Pharmacie[] = [];

	// Données pour la carte
	private map: any;
	private civData = RegionGeojson as geojson.GeoJsonObject;
	private coucheRegion: L.GeoJSON<any, geojson.Geometry>;

	centreCIV = new Coordonnees('7.536779279421307', '-5.571710194917734');
	activeZoom = 6;
	minZoom = 6.5;
	maxZoom = 20;

	icon = L.icon({
		iconUrl: 'assets/img/marker.png',
		shadowUrl: 'assets/img/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [41, 41]
	});

	constructor(
		private messageService: MessageService,
		private pharmacieService: PharmacieService) {
	}

	ngAfterViewInit(): void {
		this.listerPharmacies();
	}

	/**
	 * Applique le style du détourage de la Côte d'Ivoire.
	 *
	 * @param opaciteRemplissage la valeur de l'opacité du remplissage de la couche (compris entre 0 et 1) 
	 * @param epaisseur l'épaisseur des contours.
	 * @returns la fonction de détourage
	 */

	appliquerDetourage = (opaciteRemplissage?: number, epaisseur?: number) => {
		return {
			fillColor: '#D3D3D3', // Couleur de remplissage des zones.
			fillOpacity: opaciteRemplissage ?? 1,
			stroke: true,
			color: 'grey', // Ligne entre les zones découpée .
			weight: epaisseur ?? 2
		};
	}

	/**
	 * Initialise la carte
	 */
	private initMap(): void {
		this.map = L.map('map', {
			center: [this.centreCIV.latitude, this.centreCIV.longitude],
			zoom: this.activeZoom
		});

		const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: this.maxZoom,
			minZoom: this.minZoom,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		tile.addTo(this.map);

		// Ajout des détours
		if (this.civData) {
			this.coucheRegion = L.geoJSON(this.civData, {
				style: this.appliquerDetourage(0)
			});
			this.coucheRegion.addTo(this.map);
		}

		this.construireMarqueurs();
		setTimeout(() => {
			this.map.invalidateSize();
		}, 0);

		L.easyButton('fa-home', () => {
			this.map.setView([this.centreCIV.latitude, this.centreCIV.longitude], this.minZoom);
			this.map.closePopup();
		}).addTo(this.map);
	}

	/**
	 * Récupère la liste des pharmacies
	 */
	private listerPharmacies(): void {
		this.loading = true;
		this.pharmacieService.listerPharmacies()
			.pipe(finalize(
				() => setTimeout(() => {
					this.initMap();
				}, 100)))
			.subscribe({
				next: pharmacies => {
					this.pharmacies = pharmacies.map(pharmacie => new Pharmacie().deserialize(pharmacie));
					this.loading = false;
				},
				error: err => this.messageService.updateMessageErreur(err.error)
			});
	}

	/**
	 * Construit les marqueurs des pharmacies.
	 */
	construireMarqueurs(): void {
		this.pharmacies.filter(pharmacie => this.estCoordonneesGpsValide(pharmacie))
			.forEach(pharmacie => {
				const coordonnees = new Coordonnees(pharmacie.latitude, pharmacie.longitude);
				const marker = L.marker([coordonnees.latitude, coordonnees.longitude], { icon: this.icon })
					.bindPopup(this.construireContenuPopupDetailPharmacie(pharmacie));				
				marker.addTo(this.map);
			});
	}

	/**
	 * Vérifie la validité des coordonnées gps de la pharmacie
	 *
	 * @param pharmacie la pharmacie dont on vérifie les coordonnées
	 */
	estCoordonneesGpsValide(pharmacie: Pharmacie): boolean {
		return pharmacie && pharmacie.longitude != null && pharmacie.latitude != null &&
			Number(pharmacie.longitude) !== 0 && Number(pharmacie.latitude) !== 0;
	}

	/**
	 * Construit le contenu de la popup d'affichage des détails d'une pharmacie
	 *
	 * @param pharmacie la pharmacie
	 */
	construireContenuPopupDetailPharmacie(pharmacie: Pharmacie): string {
		return `
		<article>
			<h6> Numero: <span style="font-weight:bold"> ${pharmacie?.numero}</span><h6/>
			<h6> Nom: <span style="font-weight:bold"> ${pharmacie.nom}</span><h6/>
			<h6> Ville : <span class="title" style="text-align:center; font-weight:bold">${pharmacie.ville}</span> </h6>
			<h6> Quartier : <span class="title" style="text-align:center; font-weight:bold"> ${pharmacie.quartier}</span> </h6>
			<h6>
				Ouverte de <span class="title" style="text-align:center; font-weight:bold"> ${pharmacie.heureOuvertureFormate()}</span>
			 	à <span class="title" style="text-align:center; font-weight:bold"> ${pharmacie.heureFermetureFormate()}</span>
		 	</h6>
			<h6><span class="title" style="color: ${pharmacie.ouvert ? 'green' : 'red'}">${pharmacie.estOuvert()}</span></h6>
			<hr width="95%">
			<h6> Gérant : <span class="title" style="text-align:center; font-weight:bold"> ${pharmacie.nomGerant}</span> </h6>
			<h6> Contact : <span class="title" style="text-align:center; font-weight:bold"> ${pharmacie.contact}</span> </h6>
		</article>
		`;
	}
}
