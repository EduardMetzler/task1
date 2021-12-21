import { Component, OnInit } from '@angular/core';
import { PlaceholderService } from '../service/placeholder.service';
import { OnePost } from '../interface';



@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
  providers:[PlaceholderService]
})
export class PlaceholderComponent  {

  constructor(private placeholderService:PlaceholderService) { 

  }

  placeholdersArray:any = []

  myPost:OnePost={id:"",title:"",body:"",userId:""}
  ngOnInit() {
    this.placeholdersArray= this.placeholderService.getPlaceholders().subscribe(date=> this.placeholdersArray = date)


  }
getMyPst(event:any){
  this.myPost=event
  }
}
