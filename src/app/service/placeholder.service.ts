import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnePost } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PlaceholderService {
  posts$ = new BehaviorSubject<OnePost[]>([]);

  constructor(private http: HttpClient) {}

  private url = 'https://jsonplaceholder.typicode.com/posts';

  getPlaceholders() {
    this.http.get<OnePost[]>(this.url).subscribe(posts => {
      this.posts$.next(posts);
    });
  }

  deletePlaceholders(id: any) {
    this.http.delete<any>(`${this.url}/${id}`).subscribe({
      next: () => {
        const posts = this.posts$.getValue();
        const withouthPosts = posts.filter(p => p.id !== id);
        this.posts$.next(withouthPosts);
      },
      error: e => {
        console.log('Failed to delete');
      }
    });
  }
  updatePlaceholders(post: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${post.id}`, {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
  }

  createPlaceholders(post: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
  }
}
