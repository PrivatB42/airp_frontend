export class Coordonnees {
	latitude: number ;
	longitude: number;

	constructor(latitude: string, longitude: string) {
		this.latitude = parseFloat(latitude);
		this.longitude = parseFloat(longitude);
	}
}
