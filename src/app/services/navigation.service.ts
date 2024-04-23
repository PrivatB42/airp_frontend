import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {

	readonly URL_SLASH = '/';
	readonly URL_CONNEXION = 'connexion';

	constructor(private router: Router) {
	}

	public async goTo(route: string): Promise<void> {
		await this.router.navigate([route]);
	}

	/**
	 * Retourne true si la page de connexion est affichée.
	 */
	isLogin(): boolean {
		return this.router.url === this.construireUrl(this.URL_CONNEXION);
	}

	isPassword(): boolean {
		return this.router.url.includes('/password');
	}

	goToDashbord(): void {
		this.goTo('/tableau-de-bord');
	}

	/**
	 * Redirige vers la page de connexion.
	 */
	goTologin(): void {
		this.goTo(this.URL_CONNEXION);
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

	private construireUrl(partialUrl: string): string {
		return [this.URL_SLASH, partialUrl].join('');
	}
}
