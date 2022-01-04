import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnePost } from '../interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlaceholderService {
  posts$ = new BehaviorSubject<OnePost[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  private url = 'https://jsonplaceholder.typicode.com/posts';

  getPlaceholders() {
    this.http.get<OnePost[]>(this.url).subscribe((posts) => {
      if (this.posts$.value.length === 0) {
        return this.posts$.next(posts);
      }
    });
  }

  deletePlaceholders(id: any) {
    this.http.delete<any>(`${this.url}/${id}`).subscribe({
      next: () => {
        const posts = this.posts$.getValue();
        const withouthPosts = posts.filter((p) => p.id !== id);
        this.router.navigate([``]);

        this.posts$.next(withouthPosts);
      },
      error: (e) => {
        console.log('Failed to delete');
      },
    });
  }

  createPlaceholders(post: OnePost) {
    this.http
      .post<OnePost>(`${this.url}`, {
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      })
      .subscribe({
        next: (newPost: any) => {
          const posts = this.posts$.getValue();
          posts.push(newPost);
          this.posts$.next(posts);
        },
        error: (e) => {
          console.log('Failed to delete');
        },
      });
  }

  updatePlaceholders(post: OnePost) {
    this.http
      .put<OnePost>(`${this.url}/${post.id}`, {
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      })
      .subscribe({
        next: (updatedPost: any) => {
          const posts = this.posts$.getValue();
          const newPost = posts.filter((post) => post.id !== updatedPost.id);
          console.log(updatedPost);

          newPost.push(updatedPost);
          console.log(newPost);

          this.posts$.next(newPost);
        },
        error: (e) => {
          console.log('Failed to delete');
        },
      });
  }
}
