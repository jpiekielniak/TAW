import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DataService } from "../../services/data/data.service";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'blog-post-create',
    standalone: true,
    imports: [FormsModule, NgIf, MatFormField, MatInput, MatButton, MatError, MatLabel, MatIcon],
    providers: [DataService],
    templateUrl: './blog-post-create.component.html',
    styleUrls: ['./blog-post-create.component.css']
})
export class BlogPostCreateComponent {
    public post = {
        title: '',
        text: '',
        image: ''
    };
    public error = '';

    constructor(public dataService: DataService, private router: Router) { }

    createPost() {
        this.dataService.createPost(this.post).pipe(
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
                this.post = {
                    title: '',
                    text: '',
                    image: ''
                };
                this.router.navigate(['/blog']);
            },
            error: (err) => {
                console.error('Błąd podczas tworzenia postu:', err);
            }
        });
    }

    translateErrorMessage(message: string): string {
        switch (message) {
            case 'title is not allowed to be empty':
                return 'Tytuł nie może być pusty';
            case 'text is not allowed to be empty':
                return 'Tekst nie może być pusty';
            case 'image is not allowed to be empty':
                return 'Zdjęcie nie może być puste';
            case 'image must be a valid uri':
                return 'Zdjęcie musi być prawidłowym URI';
            default:
                return 'Wystąpił błąd. Proszę spróbować ponownie.';
        }
    }
}
