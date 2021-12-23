import { Component, OnInit } from '@angular/core';
import { PlaceholderService } from '../service/placeholder.service';
import { OnePost } from '../interface';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
  providers: [PlaceholderService],
})
export class PlaceholderComponent {
  constructor(private placeholderService: PlaceholderService) {}

  placeholdersArray: any = [];
  filterPlaceholdersArray= []
  searchValue: string = '';
  myPost: OnePost[] =[];
  ngOnInit() {
    this.placeholdersArray = this.placeholderService
      .getPlaceholders()
      .subscribe((date) => (this.placeholdersArray = date,
        this.filterPlaceholdersArray=date));

  // this.filterPlaceholdersArray= this.placeholdersArray
  }
  getmySearchValuet(date: any) {
    // this.filterPlaceholdersArray= this.placeholdersArray
    // console.log( this.myPost,this.filterPlaceholdersArray)
    console.log(date)
    this.searchValue = date;
    if(date===""){
      console.log(this.searchValue)
      this.myPost=[]
    }
    this.myPost= this.filterPlaceholdersArray.filter((item:any)=>item.title.includes(this.searchValue))

    // this.filterPlaceholdersArray=  this.filterPlaceholdersArray.filter((item:any)=> item.title.includes(this.searchValue))
//  if( this.placeholdersArray[0].title.includes(this.searchValue)){
//   // this.placeholdersArray[0].title.includes(this.searchValue)
//  }
    console.log( this.myPost)

  }
}
