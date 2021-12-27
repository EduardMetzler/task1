import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceholderService {
  constructor(private http: HttpClient) {}

  private url = 'https://jsonplaceholder.typicode.com/posts';

  getPlaceholders(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  deletePlaceholders(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
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
