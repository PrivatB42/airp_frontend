import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdministrationComponent} from "./components/administration/administration.component";
import {LoginComponent} from "./components/login/login.component";

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
		path: 'administration',
		component: AdministrationComponent
	}
];
