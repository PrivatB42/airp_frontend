export class Utilisateur {
	id: number;
	nom: string;
	prenoms: string;
	login: string;

	/**
	 * Retourne le nom et prénom abrégé de l'utilisateur (John Doe => J. Doe).
	 */
	nomEtPrenomAbrege(): string {
		return [this.prenoms.substring(0, 1), this.nom].join('. ');
	}
}
