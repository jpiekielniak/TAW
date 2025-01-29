import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private url = 'http://localhost:3100';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Object> {
        return this.http.get(`${this.url}/api/posts`);
    }

    getById(id: string): Observable<any> {
        return this.http.get(`${this.url}/api/posts/${id}`);
    }

    createPost(post: Object): Observable<any> {
        return this.http.post(`${this.url}/api/posts`, post);
    }

    deletePost(id: string): Observable<any> {
        console.log('Sending DELETE request for post with id:', id);
        return this.http.delete(`${this.url}/api/posts/${id}`, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    deleteAllPosts() : Observable<any> {
        return this.http.delete(`${this.url}/api/posts`)
    }

    getAllUsers() : Observable<any> {
        return this.http.get(`${this.url}/api/users`);
    }

    addFavorite(userId: string, postId: string): Observable<any> {
        console.log(userId);
        console.log(postId);
        return this.http.post(`${this.url}/api/users/${userId}/favorites`, {postId: postId});
    }

    removeFavorite(userId: string, postId: string): Observable<any> {
        return this.http.delete(`${this.url}/api/users/${userId}/favorites/${postId}`);
    }

    getFavorites(userId: string): Observable<any> {
        return this.http.get(`${this.url}/api/users/${userId}/favorites`);
    }
}

