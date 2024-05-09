import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

import {PharmaciesComponent} from './pharmacies.component';
import {PharmaciesService} from "../../services/pharmacies.service";
import {Pharmacie} from "../../models/pharmacie.model";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('PharmaciesComponent', () => {
	let component: PharmaciesComponent;
	let fixture: ComponentFixture<PharmaciesComponent>;
	let pharmacieService: PharmaciesService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PharmaciesComponent],
			providers: [
				PharmaciesService,
				HttpClient,
				HttpHandler
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(PharmaciesComponent);
		component = fixture.componentInstance;
		pharmacieService = TestBed.inject(PharmaciesService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	/**
	 * Vérifie qu'on retourne bien la liste des pharmacies
	 */
	it('shouldRecupererPharmaciesAvecSucces', () => {
		//Given
		const pharmacie1: Pharmacie = new Pharmacie().deserialize({
			id: 1,
			numero: "5588",
			nom: "Sainte Famille",
			ville: "Abidjan",
			quartier: "Angré",
			heureOuverture: [9,30,10],
			nomGerant: "Keita",
			contact: "0555",
		});
		const pharmacie2 = new Pharmacie().deserialize({
			id: 2,
			numero: "5588",
			nom: "Sainte Famille",
			ville: "Abidjan",
			quartier: "Angré",
			heureOuverture: [9,30,10],
			nomGerant: "Keita",
			contact: "0555",
		});
		const pharmacies: Pharmacie[] = [pharmacie1, pharmacie2];
		spyOn(pharmacieService, 'lister').and.returnValue(of(pharmacies));

		//When
		component.recupererPharmacies();

		//Then
		expect(component.pharmacies).toEqual(pharmacies);
	});

	it('shouldMontrerErreurWhenProblemeDeRecuperation', () => {
		//Given
		const error = 'An error occurred';
		spyOn(pharmacieService, 'lister').and.returnValue(throwError(error));
		spyOn(console, 'error');

		//When
		component.recupererPharmacies();

		//Then
		expect(console.error).toHaveBeenCalledWith('Une erreur s\'est produite : ', error);
	});
});
