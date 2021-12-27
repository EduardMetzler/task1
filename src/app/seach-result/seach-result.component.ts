import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  update:any="";
  newValue:any=""
  create=false


  form: FormGroup =   new FormGroup({
    id:new FormControl("12"),
    
    userId:new FormControl("12"),


    title:new FormControl("",Validators.required),
    body:new FormControl("",Validators.required)

  })




  ngOnInit() {
    this.placeholderService
    .getPlaceholders()
    .subscribe(
      (date) => (
        (this.placeholdersArray = date),
        (this.filterPlaceholdersArray = date)
        // (this.myPost = date.filter((item: any) =>
        //   item.title.includes(this.search)
        // ))
      )
      
    );



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
      console.log(this.search)
 
      this.filterPlaceholdersArray = this.placeholdersArray.filter((item: any) =>
      item.title.includes(this.search)

    );
      
    })


 



  }

  getUpdatePostId($event:any){
    this.update=$event
    console.log(this.update)
    const text:any= this.filterPlaceholdersArray.find((item:any)=>item.id===this.update)
    this.newValue= text.body
  
  
  
    }
  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  //   // console.log(this.search)
  //   console.log(changes)

  //   this.filterPlaceholdersArray = this.placeholdersArray.filter((item: any) =>
  //   item.title.includes(this.search)
  //   // console.log(this.filterPlaceholdersArray)

  // );
    
  // }
  // postDelete(id:any) {

  //   this.placeholderService.deletePlaceholders(id).subscribe((data) => {
  //    this.myPost= this.myPost.filter(
  //       (da: any) => da.id!==id
  //     )
  //     console.log(this.myPost)
  //   });
  // }



  backToList(){
    this.update= ""
    this.create=false

  }

  

  onePostUpdateSave(){
  

    const post:any=this.filterPlaceholdersArray.find((item:any)=>item.id===this.update)
    console.log(post)
    post.body=this.newValue

    this.placeholderService.updatePlaceholders(post).subscribe((data) => {
 
       console.log(data)
     });


  }

  getNewPostListe($event:any){
    this.filterPlaceholdersArray=$event
    console.log($event)
  }

//   postDelete(id:any) {

//     this.placeholderService.deletePlaceholders(id).subscribe((data) => {
//      this.filterPlaceholdersArray= this.filterPlaceholdersArray.filter(
//         (da: any) => da.id!==id
//       )
//       console.log(this.myPost)
//     });


//   }

//   postUpdate(id:any){
//     this.update= id
//  const a= this.filterPlaceholdersArray.find((item:any)=>item.id===id)
//   this.newValue=a.body

//   }



}

