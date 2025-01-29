import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import {Token} from "../../models/token";
import {map} from 'rxjs/operators';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost:3100/api';

    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    }

    authenticate(credentials: any) {
        const localStorage = this.document.defaultView?.localStorage;
        return this.http.post<any>(`${this.url}/user/auth`, {
            login: credentials.login,
            password: credentials.password
        }).pipe(
            map((result: Token | any) => {
                if (result && result.token) {
                    localStorage?.setItem('token', String(result.token));
                    return true;
                }
                return false;
            })
        )
    }

    createOrUpdate(credentials: any) {
        return this.http.post(`${this.url}/user/create`, {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        });
    }

    logout() {
        const localStorage = this.document.defaultView?.localStorage;
        return this.http.delete(`${this.url}/user/logout/${this.currentUser.userId}`)
            .pipe(
                map(() => localStorage?.removeItem('token'))
            )
    }

    isLoggedIn() {
        const localStorage = this.document.defaultView?.localStorage;
        const jwtHelper = new JwtHelperService();
        const token = localStorage?.getItem('token');
        if (!token) {
            return false;
        }
        return !(jwtHelper.isTokenExpired(token));
    }

    get currentUser() {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        return new JwtHelperService().decodeToken(token)
    }

    getToken() {
        const localStorage = this.document.defaultView?.localStorage;
        return localStorage?.getItem('token');
    }

    isAdmin() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        return new JwtHelperService().decodeToken(token).isAdmin;
    }

    resetPassword(email: string) {
        return this.http.post(`${this.url}/users/reset-password`, {
            email: email
        });
    }
}
