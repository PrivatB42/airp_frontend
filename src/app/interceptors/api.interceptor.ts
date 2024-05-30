import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from "../../environments/environment";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
	const apiUrl = environment.apiUrl;
	const token = localStorage.getItem('access_token');

	const isAbsoluteUrl = (url: string) => {
		const absolutePattern = /^http?:\/\//i;
		return absolutePattern.test(url);
	};

	const preparerUrl = (url: string) => {
		if (url.includes('assets') || url.includes('data')) {
			return url;
		}

		url = isAbsoluteUrl(url) ? url : apiUrl + '/' + url;
		return url.replace(/([^:]\/)\/+/g, '$1');
	};


	// Clone the request and add the authorization header
	const authReq = req.clone({
		url: preparerUrl(req.url),
		withCredentials: true,
		setHeaders: {
			'Authorization': token ?? ''
		}
	});

	// Pass the cloned request with the updated header to the next handler
	return next(authReq);
};
