import { Component, Input, OnInit } from '@angular/core';
import { PlaceholderService } from '../service/placeholder.service';



@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})


export class OnePostComponent implements OnInit {

  constructor() { 

  }
  @Input() myPost:any



  ngOnInit() {
    console.log(this.myPost)



  }





}
