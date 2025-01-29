import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data/data.service";
import {AuthService} from "../../services/auth/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
    selector: 'blog-post-favorites',
    standalone: true,
    imports: [
        NgForOf,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatIcon,
        MatCardActions,
        MatCardTitle,
        MatButton,
        MatCardImage,
        NgIf
    ],
    templateUrl: './blog-post-favorites.component.html',
    styleUrl: './blog-post-favorites.component.css'
})
export class BlogPostFavoritesComponent implements OnInit {
    favorites: any[] = [];

    constructor(private service: DataService, private authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loadFavorites();
    }

    removeFavorite(postId: string): void {
        this.service
            .removeFavorite(this.authService.currentUser.userId, postId)
            .subscribe(() => this.loadFavorites());
    }

    loadFavorites() {
        this.service
            .getFavorites(this.authService.currentUser.userId)
            .subscribe(favorites => this.favorites = favorites);
    }

    navigateToDetail(id: string) {
        this.router.navigate(['/blog/detail', id]);
    }

}
