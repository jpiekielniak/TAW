import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'user-reset-password',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatError,
        MatFormField,
        MatIcon,
        MatInput,
        NgIf,
        MatButton
    ],
  templateUrl: './user-reset-password.component.html',
  styleUrl: './user-reset-password.component.css'
})
export class UserResetPasswordComponent {

    public credentials = {
        email: ''
    }

    constructor(private authService: AuthService, private router: Router) {
    }

    resetPassword() {
        return this.authService
            .resetPassword(this.credentials.email)
            .subscribe(() => {
                this.router.navigate(['/login']);
            });
    }
}
