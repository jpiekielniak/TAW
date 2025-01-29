import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {switchMap} from "rxjs";
import {DataService} from "../../services/data/data.service";
import {AuthService} from "../../services/auth/auth.service";
import {NgIf} from "@angular/common";
import {MatCard,MatCardTitle, MatCardActions, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
    selector: 'blog-item-details',
    imports: [HttpClientModule, RouterLink, MatCardTitle, NgIf, MatCard, MatCardHeader, MatCardImage, MatCardContent, MatIcon, MatCardActions, MatButton, MatAnchor],
    providers: [DataService, AuthService],
    templateUrl: './blog-item-details.component.html',
    standalone: true,
    styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
    public image: string = '';
    public text?: string = '';
    public title?: string;
    public views: Number = 0;
    public id: string = '';
    isFavorite: boolean | undefined;


    constructor(private service: DataService, private route: ActivatedRoute,
                private router: Router, public authService: AuthService) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                this.id = id!;
                return this.service.getById(id!);
            })
        ).subscribe({
            next: (res: any) => {
                this.image = res.image;
                this.text = res.text;
                this.title = res.title;
                this.views = res.views;
                this.checkIfFavorite();
            },
            error: (err) => {
                console.error('Failed to fetch blog item details', err);
            }
        });
    }

    deleteBlogItem() {
        console.log(this.id);
        this.service.deletePost(this.id).subscribe({
            next: () => {
                this.router.navigate(['/blog']);
            },
            error: (err) => {
                console.error('Failed to delete blog item', err);
            }
        });
    }

    addFavorite(): void {
        this.service.addFavorite(this.authService.currentUser.userId, this.id).subscribe(() => this.isFavorite = true);
    }

    checkIfFavorite(): void {
        this.service.getFavorites(this.authService.currentUser.userId).subscribe({
            next: (favorites: any[]) => {
                console.log(favorites);
                console.log(this.id);
                this.isFavorite = favorites.some(favorite => favorite._id === this.id);
                console.log(this.isFavorite)
            },
            error: (err) => {
                console.error('Failed to fetch user favorites', err);
            }
        });
    }
}
