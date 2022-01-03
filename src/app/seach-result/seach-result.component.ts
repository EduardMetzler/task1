import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { OnePost } from '../interface';
import { PlaceholderService } from '../service/placeholder.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-seach-result',
  templateUrl: './seach-result.component.html',
  styleUrls: ['./seach-result.component.css'],
})
export class SeachResultComponent implements OnInit {
  constructor(
    private placeholderService: PlaceholderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  posts$ = combineLatest([
    this.route.queryParamMap,
    this.placeholderService.posts$,
  ]).pipe(
    map(([queryParamsMap, posts]) => {
      const query = queryParamsMap.get('k');
      if (!query) {
        return posts;
      }
      console.log(posts);
      return posts.filter((post) => post.title.includes(query));
    })
  );
  search: string = '';
  placeholdersArray: any = [];
  filterPlaceholdersArray = [];
  searchValue: string = '';
  myPost: any;
  update: any = '';
  newValue: any = '';
  create = false;

  form: FormGroup = new FormGroup({
    id: new FormControl('12'),

    userId: new FormControl('12'),

    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.placeholderService.getPlaceholders();

    // this.search = this.route.snapshot.params['search'];

    //  this.route.params.subscribe((params:Params)=>{this.search=params["search"]})

    // this.search = this.route.snapshot.queryParams['k'];
  }

  getUpdatePostId($event: any) {
    this.update = $event;
    console.log(this.update);
    const text: any = this.filterPlaceholdersArray.find(
      (item: any) => item.id === this.update
    );
    this.newValue = text.body;
  }



  getNewPostListe($event: any) {
    this.filterPlaceholdersArray = $event;
    console.log($event);
  }
  backToList() {
    this.router.navigate([``]);
  }
}
