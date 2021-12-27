import { Component,Output, EventEmitter } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent  {
  route: ActivatedRoute | null | undefined;
  constructor(private router:Router,) {}
  searchValue: string = '';
  create=false


  placeholdersArray: any = [];
  @Output() mySearchValue = new EventEmitter<any>();



  send() {
    // if(this.searchValue!==""){
      this.router.navigate([`/search`],{queryParams:{k:`${this.searchValue.trim()}`},relativeTo:this.route})

    // }
    

  }


}
