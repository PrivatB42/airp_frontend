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

	deserialize(pharmacie: Partial<Pharmacie>): Pharmacie {
		Object.assign(this, pharmacie);
		return this;
	}

	/**
	 * Formate l'heure d'ouverture (Ex: 07:35)
	 */
	public heureOuvertureFormate(): string {
		return this.heureOuverture ? this.heureOuverture.map(value => value.toString().padStart(2, '0')).join(':') : '-';
	}

	/**
	 * Formate l'heure de fermeture (Ex: 20:35)
	 */
	public heureFermetureFormate(): string {
		return this.heureFermeture ? this.heureFermeture.map(value => value.toString().padStart(2, '0')).join(':') : '-';
	}

	/**
	 * Affiche si la pharmacie est ouverte ou non
	 */
	public estOuvert(): string {
		return this.ouvert ? 'Ouverte' : 'Fermée';
	}
}
