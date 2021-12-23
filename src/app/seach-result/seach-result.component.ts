import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OnePost } from '../interface';
import { PlaceholderService } from '../service/placeholder.service';

@Component({
  selector: 'app-seach-result',
  templateUrl: './seach-result.component.html',
  styleUrls: ['./seach-result.component.css'],
})
export class SeachResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private placeholderService: PlaceholderService
  ) {}
  search: string = '';
  placeholdersArray: any = [];
  filterPlaceholdersArray = [];
  searchValue: string = 'dd';
  myPost: OnePost[] = [];

  ngOnInit() {
    // this.search = this.route.snapshot.params['search'];

    //  this.route.params.subscribe((params:Params)=>{this.search=params["search"]})

    this.search = this.route.snapshot.queryParams['k'];

    this.placeholderService
      .getPlaceholders()
      .subscribe(
        (date) => (
          (this.placeholdersArray = date),
          (this.filterPlaceholdersArray = date),
          (this.myPost = date.filter((item: any) =>
            item.title.includes(this.search)
          ))
        )
      );
    // console.log(this.filterPlaceholdersArray )

    // this.myPost = this.filterPlaceholdersArray.filter((item: any) =>
    //   item.title.includes(this.search)
    // );
    // console.log(this.myPost)
  }
}
