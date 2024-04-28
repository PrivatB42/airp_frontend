import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {LoginComponent} from "./components/login/login.component";
import {ReferentielComponent} from "./components/referentiel/referentiel.component";
import {PharmaciesComponent} from "./components/referentiel/pharmacies/pharmacies.component";

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/tableau-de-bord',
		pathMatch: 'full'
	},
	{
		path: 'connexion',
		component: LoginComponent
	},
	{
		path: 'tableau-de-bord',
		component: DashboardComponent
	},
	{
		path: 'referentiel',
		component: ReferentielComponent,
		children: [
			{
				path: 'pharmacies',
				component: PharmaciesComponent
			}
		],
	},
	{
		path: 'administration',
		component: AdministrationComponent
	}
];
