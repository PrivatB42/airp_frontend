export class Pharmacie {
	id: number;
	numero: string;
	nom: string;
	ville: string;
	quartier: string;
	heureOuverture: number[];
	nomGerant: string;
	contact: string;

	deserialize(input: any): Pharmacie {
		Object.assign(this, input);
		return this;
	}

	/**
	 * Formate l'heure d'ouverture (Ex: 7H : 35)
	 */
	public heureOuvertureFormate(): string {
		return this.heureOuverture ? this.heureOuverture[0] + ' : ' + (this.heureOuverture[1] > 10 ? this.heureOuverture[1] : "0" + this.heureOuverture[1]) : '-';
	}
}
