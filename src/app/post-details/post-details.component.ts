import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceholderService } from '../service/placeholder.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private placeholderService: PlaceholderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  posts$ = combineLatest([
    this.placeholderService.posts$,
    this.route.params,
  ]).pipe(
    map(([posts, paramsId]) => {
      const params = paramsId['id'];
      console.log(posts, params);

      return posts.find((post) => post.id === +params);
    })
  );

  ngOnInit(): void {
    this.posts$.subscribe();
    this.placeholderService.getPlaceholders();
  }

  postDelete(id: number) {
    this.placeholderService.deletePlaceholders(id);
  }

  postUpdate(id: any) {
    this.router.navigate([`update/${id}`]);
  }
}
