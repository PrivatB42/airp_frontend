export class Pharmacie {
	id: number;
	numero: string;
	nom: string;
	ville: string;
	quartier: string;
	heureOuverture: number[]; // Retourne un tableau ou [0] = heures, [1] = minutes, [2]= secondes ... 😕
	heureFermeture: number[];
	nomGerant: string;
	contact: string;
	statut: string;
	latitude: string;
	longitude: string;

	ouvert: boolean;

	deserialize(input: any): Pharmacie {
		Object.assign(this, input);
		return this;
	}

	/**
	 * Formate l'heure d'ouverture (Ex: 7:35)
	 */
	public heureOuvertureFormate(): string {
		return this.heureOuverture ? this.heureOuverture[0] + ':' + (this.heureOuverture[1] > 10 ? this.heureOuverture[1] : "0" + this.heureOuverture[1]) : '-';
	}

	/**
	 * Formate l'heure de fermeture (Ex: 20:35)
	 */
	public heureFermetureFormate(): string {
		return this.heureFermeture ? this.heureFermeture[0] + ':' + (this.heureFermeture[1] > 10 ? this.heureFermeture[1] : "0" + this.heureFermeture[1]) : '-';
	}

	/**
	 * Affiche si la pharmacie est ouverte ou non
	 */
	public estOuvert(): string {
		return this.ouvert ? 'Ouverte' : 'Fermée';
	}
}
