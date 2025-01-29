import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
    selector: 'login',
    standalone: true,
    imports: [FormsModule, RouterLink, MatFormField, MatIcon, MatError, MatInput, MatAnchor, MatButton, NgIf],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    public credentials = {
        login: '',
        password: ''
    };

    public logged?: boolean;
    public logout?: boolean;

    constructor(public authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }

    signIn() {
        return this.authService
            .authenticate(this.credentials)
            .subscribe((result) => {
                if (!result) {
                    this.logged = false
                } else {
                    this.logout = false
                    this.credentials = {
                        login: '',
                        password: ''
                    }
                    this.router.navigate(['/'])
                }
            })
    }

}
