import { Component, OnInit } from '@angular/core';
import { PlaceholderService } from '../service/placeholder.service';
import { OnePost } from '../interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],

})
export class PlaceholderComponent {
  constructor(private placeholderService: PlaceholderService) {}

  placeholdersArray$: any = [];
  update=""

  create=false





  sortSwitch=[false,true,true]

  filterPlaceholdersArray: any = [];
  searchValue: string = '';
  myPost: OnePost[] = [];
  newValue=""
  newPost={id:"",title:"",body:"dd"}



  form: FormGroup =   new FormGroup({
    id:new FormControl("12"),
    
    userId:new FormControl("12"),


    title:new FormControl("",Validators.required),
    body:new FormControl("",Validators.required)

  })
  ngOnInit() {
 

    
    this.placeholderService
        .getPlaceholders()
        .subscribe((date) => (this.placeholdersArray$ = date,
          this.filterPlaceholdersArray=date,console.log(date)));
    
    


    // this.placeholdersArray$ = this.placeholderService.getPlaceholders();
    // this.filterPlaceholdersArray = this.placeholdersArray$



  }

  postDelete(id:any) {

    this.placeholderService.deletePlaceholders(id).subscribe((data) => {
     this.filterPlaceholdersArray= this.filterPlaceholdersArray.filter(
        (da: any) => da.id!==id
      )
      console.log(this.myPost)
    });


  }

  postUpdate(id:any){
    this.update= id
 const a= this.filterPlaceholdersArray.find((item:any)=>item.id===id)
  this.newValue=a.body

  }

  postCreate(){
    this.create=true

  }

  sort(type:any,n:number){
    if(this.sortSwitch[n]){
      this.filterPlaceholdersArray.sort((a:any,b:any)=>{
        if ( a[type] > b[type] ){
          return 1;
        }
        if ( a[type] < b[type] ){
          return -1;
        }
        return 0;
      } )

    }
    else{
      this.filterPlaceholdersArray.sort((a:any,b:any)=>{
        if ( a[type] < b[type] ){
          return 1;
        }
        if ( a[type] > b[type] ){
          return -1;
        }
        return 0;
      } )
    }

    this.sortSwitch[n]= !this.sortSwitch[n]

    

  }

  backToList(){
    this.update= ""
    this.create=false

  }

  onePostUpdateSave(){
  

    const post=this.filterPlaceholdersArray.find((item:any)=>item.id===this.update)
    console.log(post)
    post.body=this.newValue

    this.placeholderService.updatePlaceholders( post).subscribe((data) => {
 
       console.log(data)
     });


  }



  onSubmit(){
console.log(this.form.value)

this.placeholderService.createPlaceholders(this.form.value).subscribe((data) => {

   console.log(data)
   this.filterPlaceholdersArray.push(data)
   console.log(this.placeholdersArray$)
 });


  }


}
