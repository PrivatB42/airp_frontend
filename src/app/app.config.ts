import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {apiInterceptor} from "./interceptors/api.interceptor";
import {JWT_OPTIONS, JwtHelperService, JwtInterceptor} from "@auth0/angular-jwt";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {provideAnimations} from "@angular/platform-browser/animations";

export const httpInterceptorsProviders = [
	// {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true},
	{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
];

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		provideHttpClient(withInterceptors([apiInterceptor])),
		JwtHelperService,
		httpInterceptorsProviders,
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
	],
};
