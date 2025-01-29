import {HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token: string = localStorage.getItem('token') ?? '';


    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(authReq);
    } else {
        return next(req);
    }
};
