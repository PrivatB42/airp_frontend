import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {PharmaciesService} from './pharmacies.service';
import {Pharmacie} from "../models/pharmacie.model";

describe('PharmaciesService', () => {
	let service: PharmaciesService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [PharmaciesService]
		});
		service = TestBed.inject(PharmaciesService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('shouldRetournerPharmaciesFromAPI', fakeAsync(() => {
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
		const mockPharmacies: Pharmacie[] = [pharmacie1, pharmacie2];

		//WHEN-THEN
		service.lister().subscribe((pharmacies: Pharmacie[]) => {
			expect(pharmacies).toEqual(mockPharmacies);
		});

		const req = httpMock.expectOne(`${service.baseUrl}/lister`);
		expect(req.request.method).toBe('GET');

		req.flush(mockPharmacies);

		tick();
	}));


	it('shouldMontrerErreurWhenAppelAPIEchoue', fakeAsync(() => {
		service.lister().subscribe({});

		const req = httpMock.expectOne(`${service.baseUrl}/lister`);

		req.flush('', {status: 404, statusText: 'Not Found'});
	}));
});
