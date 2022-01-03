import { Component, OnInit } from '@angular/core';
import { PlaceholderService } from '../service/placeholder.service';
import { OnePost } from '../interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
})
export class PlaceholderComponent {
  posts$ = combineLatest([
    this.route.queryParamMap,
    this.placeholderService.posts$,
  ]).pipe(
    map(([queryParamsMap, posts]) => {
      const query = queryParamsMap.get('k');
      if (!query) {
        return posts;
      }
      return posts.filter((post) => post.title.includes(query));
    })
  );

  // posts$=this.placeholderService.getPlaceholders();

  constructor(
    private placeholderService: PlaceholderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  placeholdersArray$: any = [];
  update = '';

  filterPlaceholdersArray: any = [];
  searchValue: string = '';
  myPost: OnePost[] = [];
  newValue = '';
  newPost = { id: '', title: '', body: 'dd' };

  ngOnInit() {
    this.placeholderService.getPlaceholders();

    // this.placeholdersArray$ = this.placeholderService.getPlaceholders();
    // this.filterPlaceholdersArray = this.placeholdersArray$
  }
  getUpdatePostId($event: any) {
    this.router.navigate([`update/${$event}`]);
    console.log($event);
  }

  getNewPostListe($event: any) {
    this.filterPlaceholdersArray = $event;
    console.log($event);
  }

  postCreate() {
    this.router.navigate([`create`]);
  }

  onDeletePost(id: number) {
    this.placeholderService.deletePlaceholders(id);
  }
}
