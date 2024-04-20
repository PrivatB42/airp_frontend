import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {

	constructor(private router: Router) {
	}

	public async goTo(route: string): Promise<void> {
		await this.router.navigate([route]);
	}

	isLogin(): boolean {
		return this.router.url === '/login';
	}

	isPassword(): boolean {
		return this.router.url.includes('/password');
	}

	goToHome(): void {
		this.goTo('/');
	}

	goTologin(): void {
		this.goTo('login');
	}

	getCurrentUrl(): string {
		return this.router.url;
	}

	getHostname(): string {
		return window.location.hostname;
	}

	isHome() {
		return this.router.url.includes('/accueil');
	}
}
