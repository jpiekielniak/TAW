import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, MatLabel, MatFormField, MatInput, MatError, MatButton],
    providers: [AuthService],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    public credentials = {
        name: '',
        email: '',
        password: '',
    }
    public error: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        this.authService.createOrUpdate(this.credentials).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error.message) {
                    this.error = this.translateErrorMessage(error.error.message);
                } else {
                    this.error = 'Wystąpił błąd. Proszę spróbować ponownie.';
                }
                return throwError(() => new Error(this.error));
            })
        ).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (err) => {
                console.error('Błąd podczas tworzenia usera:', err);
            }
        })
    }

    translateErrorMessage(message: string): string {
        switch (message) {
            case 'name is not allowed to be empty':
                return 'Nazwa jest wymagana.';
            case 'name is required':
                return 'Nazwa jest wymagana.';
            case 'email must be a valid email':
                return 'Email musi być prawidłowy.';
            case 'email is not allowed to be empty':
                return 'Email jest wymagany.';
            case 'password is not allowed to be empty':
                return 'Hasło jest wymagane.';
            case 'password is required':
                return 'Hasło jest wymagane.';
            default:
                return '';
        }
    }
}
