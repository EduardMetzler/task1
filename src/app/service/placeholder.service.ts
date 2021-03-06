import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { OnePost, UsersIdAndName } from '../interface'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root',
})
export class PlaceholderService {
  posts$ = new BehaviorSubject<OnePost[]>([])

  users$ = new BehaviorSubject<UsersIdAndName[]>([])

  usersById$ = this.users$.pipe(map((users)=>{
    return users.reduce(( obj, user ) => {
      return {
        ...obj,
        [ user.id ] : user,
     
      }
    }, {} as {[key : number] : UsersIdAndName})
  }))

  postsWithUSers$ = combineLatest([this.posts$, this.usersById$]).pipe( map(([posts, usersById]) => {
    return posts.map( post => {
      return {
        ...post,
        username : usersById[post.userId].username
      }
    
    })
  }))

  constructor(private http: HttpClient, private router: Router) {}

  private url = 'https://jsonplaceholder.typicode.com/posts'

  getPlaceholders() {
    if (this.posts$.value.length ) {
      return;

    }
    this.http.get<OnePost[]>(this.url).subscribe((posts) => {
      this.posts$.next(posts)
   
    
    })
  }


  getUsersList(){
    this.http
    .get<any>('https://jsonplaceholder.typicode.com/users')
    .subscribe((users) => {
      if (this.users$.value.length === 0) {
        const userArray = users.map((oneUser:UsersIdAndName) => {
          return { id: oneUser.id, username: oneUser.username }
        })

        return this.users$.next(userArray)
      }
    })
  }

  deletePlaceholders(id: number) {
    this.http.delete<any>(`${this.url}/${id}`).subscribe({
      next: () => {
        const posts = this.posts$.getValue()
        const withouthPosts = posts.filter((p) => p.id !== id)
        this.router.navigate([``])

        this.posts$.next(withouthPosts)
      },
      error: (e) => {
        console.log('Failed to delete')
      },
    })
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
          console.log(post.id)
          const posts = this.posts$.getValue()
          newPost.userId = post.userId,
          posts.push(newPost)
          console.log(posts)

          this.posts$.next(posts)
        },
        error: (e) => {
          console.log('Failed to delete')
        },
      })
  }

  updatePlaceholders(post: OnePost) {
    console.log(post)
    this.http
      .put<OnePost>(`${this.url}/${post.id}`, {
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      })
      .subscribe({
        next: (updatedPost: any) => {
          console.log(updatedPost)
          const posts = this.posts$.getValue()
          const newPost = posts.map((post) => {
            return post.id === updatedPost.id ? updatedPost : post
          })

          this.router.navigate([``])

          this.posts$.next(newPost)
        },
        error: (e) => {
          console.log('Failed to update')
        },
      })
  }
}
