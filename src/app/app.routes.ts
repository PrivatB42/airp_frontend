import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {LoginComponent} from "./components/login/login.component";
import {ReferentielComponent} from "./components/referentiel/referentiel.component";
import {PharmaciesComponent} from "./components/pharmacies/pharmacies.component";
import {MedicamentsComponent} from "./components/medicaments/medicaments.component";
import {CarteInteractiveComponent} from "./components/carte-interactive/carte-interactive.component";

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
				path: '',
				redirectTo: 'pharmacies',
				pathMatch: 'full'
			},
			{
				path: 'pharmacies',
				component: PharmaciesComponent
			},
			{
				path: 'medicaments',
				component: MedicamentsComponent
			}
		],
	},
	{
		path: 'administration',
		component: AdministrationComponent
	},
	{
		path: 'carte',
		component: CarteInteractiveComponent
	}
];
