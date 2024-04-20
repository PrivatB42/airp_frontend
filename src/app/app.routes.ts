import { Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdministrationComponent} from "./components/administration/administration.component";

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/tableau-de-bord',
		pathMatch: 'full'
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
