import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { PlaceholderService } from '../service/placeholder.service';
import { OnePost } from '../interface';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private placeholderService:PlaceholderService) { 

  }
  searchValue:string= ""
  myPost:OnePost={id:"",title:"",body:"",userId:""}
  placeholdersArray:any = []
  @Output()newMyPost =new EventEmitter<any>()




  ngOnInit() {
    this.placeholdersArray= this.placeholderService.getPlaceholders().subscribe(date=> this.placeholdersArray = date)


  }

  send(){
    // console.log(typeof(this.searchValue))
    if(this.searchValue!=="" ){
     this.myPost= this.placeholdersArray[+this.searchValue-1 ]
    // console.log(this.myPost)


    }
    else{
     this.myPost={id:"",title:"",body:"",userId:""}
    }

    this.newMyPost.emit(this.myPost)
  
   
   
     }

     reset(){
     this.myPost={id:"",title:"",body:"",userId:""}
     this.searchValue=""
    this.newMyPost.emit(this.myPost)



     }

}
