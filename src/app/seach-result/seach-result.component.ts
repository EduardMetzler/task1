import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OnePost } from '../interface';
import { PlaceholderService } from '../service/placeholder.service';
// import "rxjs/add/operator/filter";


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
  searchValue: string = '';
  myPost: any ;



  ngOnInit() {
    // this.search = this.route.snapshot.params['search'];

    //  this.route.params.subscribe((params:Params)=>{this.search=params["search"]})

    // this.search = this.route.snapshot.queryParams['k'];

    // this.route.queryParams.subscribe((params:Params)=>this.search=params["k"])
    //  this.route.queryParams.filter((params:Params)=>params["k"]).subscribe((params:Params)=>{
    //   console.log(params)
    // })
    this.route.queryParamMap.subscribe((params:any)=>{
      console.log(params.params)

      this.search=params.params["k"]
 
      this.myPost = this.filterPlaceholdersArray.filter((item: any) =>
      item.title.includes(this.search),
      console.log(this.myPost)
    );
      
    })
 

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
      // this.myPost = this.filterPlaceholdersArray.filter((item:any)=>item.title.includes(this.search))
   

      // this.myPost = [{   id:"sss",
      //   title:"frg",
      //   body:"2",
      //   userId:"dd"}]

        // setTimeout(()=>{
        //   this.myPost.push({   id:"sss",
        //   title:"frg",
        //   body:"2",
        //   userId:"dd"})
        // },2000)

    // console.log(this.filterPlaceholdersArray )

    // this.myPost = this.filterPlaceholdersArray.filter((item: any) =>
    //   item.title.includes(this.search)
    // );
    // console.log(this.myPost)
  }
  postDelete(id:any) {
    console.log('sssssssss');
    this.placeholderService.deletePlaceholders(id).subscribe((data) => {
     this.myPost= this.myPost.filter(
        (da: any) => da.id!==id
      )
      console.log(this.myPost)
    });
  }

}
