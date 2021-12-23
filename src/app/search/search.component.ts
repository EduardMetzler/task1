import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PlaceholderService } from '../service/placeholder.service';
import { OnePost } from '../interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  route: ActivatedRoute | null | undefined;
  constructor(private placeholderService: PlaceholderService,private router:Router,) {}
  searchValue: string = '';
  // myPost: OnePost = { id: '', title: '', body: '', userId: '' };
  placeholdersArray: any = [];
  @Output() mySearchValue = new EventEmitter<any>();

  ngOnInit() {
    // this.placeholdersArray = this.placeholderService
    //   .getPlaceholders()
    //   .subscribe((date) => (this.placeholdersArray = date));
  }

  send() {
    this.router.navigate([`/search`],{queryParams:{k:`${this.searchValue}`},relativeTo:this.route})
    // console.log(typeof(this.searchValue))
    // if (this.searchValue !== '') {
    //   // this.myPost = this.placeholdersArray[+this.searchValue - 1];
    //   // console.log(this.myPost)
    // } else {
    //   // this.myPost = { id: '', title: '', body: '', userId: '' };
    // }

    this.mySearchValue.emit(this.searchValue);
  }

  reset() {
     // this.myPost = { id: '', title: '', body: '', userId: '' };
     this.searchValue = '';
     this.mySearchValue.emit(this.searchValue.trim());
     // this.newMyPost.emit(this.myPost);
   }
}
