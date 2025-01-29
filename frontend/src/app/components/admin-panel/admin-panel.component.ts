import { Component } from '@angular/core';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {DataService} from "../../services/data/data.service";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SummaryPipe} from "../../pipes/summary.pipe";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MatTabsModule,
        MatButtonModule,
        SummaryPipe,
        RouterLink,
        MatList,
        MatListItem,
        MatIcon,
        MatLine
    ],
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
    users: any[] = [];
    posts$: any;
    usersLoaded = false;
    postsLoaded = false;

    constructor(private service: DataService) {}

    onTabChange(event: MatTabChangeEvent): void {
        if (event.index === 0 && !this.usersLoaded) {
            this.loadUsers();
        } else if (event.index === 1 && !this.postsLoaded) {
            this.loadPosts();
        }
    }

    loadUsers(): void {
        this.service.getAllUsers().subscribe(
            (data) => {
                this.users = data;
                this.usersLoaded = true;
            },
            (error) => {
                console.error('Error fetching users', error);
            }
        );
    }

    loadPosts(): void {
        this.service.getAll().subscribe(
            (data: any) => {
                this.posts$ = data;
                this.postsLoaded = true;
            },
            (error) => {
                console.error('Error fetching posts', error);
            }
        );
    }

    deleteAllPosts(): void {
        if (confirm('Czy na pewno chcesz usunąć wszystkie posty?')) {
            this.service.deleteAllPosts().subscribe(
                () => {
                    console.log('All posts deleted successfully');
                    this.posts$ = [];
                },
                (error) => {
                    console.error('Error deleting posts', error);
                }
            );
        }
    }

    deleteBlogItem(id : string) {
        console.log(id);
        this.service.deletePost(id).subscribe({
            next: () => {
                this.loadPosts();
            },
            error: (err) => {
                console.error('Failed to delete blog item', err);
            }
        });
    }
}
