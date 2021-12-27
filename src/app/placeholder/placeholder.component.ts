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
  update = '';

  create = false;

  filterPlaceholdersArray: any = [];
  searchValue: string = '';
  myPost: OnePost[] = [];
  newValue = '';
  newPost = { id: '', title: '', body: 'dd' };

  form: FormGroup = new FormGroup({
    id: new FormControl('12'),

    userId: new FormControl('12'),

    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });
  ngOnInit() {
    this.placeholderService
      .getPlaceholders()
      .subscribe(
        (date) => (
          (this.placeholdersArray$ = date),
          (this.filterPlaceholdersArray = date),
          console.log(date)
        )
      );



    // this.placeholdersArray$ = this.placeholderService.getPlaceholders();
    // this.filterPlaceholdersArray = this.placeholdersArray$
  }
  getUpdatePostId($event: any) {
    this.update = $event;
    console.log(this.update);
    const text = this.filterPlaceholdersArray.find(
      (item: any) => item.id === this.update
    );
    this.newValue = text.body;
    console.log(this.newValue)
  }

  getNewPostListe($event: any) {
    this.filterPlaceholdersArray = $event;
    console.log($event);
  }

  postCreate() {
    this.create = true;
  }

  backToList() {
    this.update = '';
    this.create = false;
  }

  onePostUpdateSave() {
    const post = this.filterPlaceholdersArray.find(
      (item: any) => item.id === this.update
    );
    console.log(post);
    post.body = this.newValue;

    this.placeholderService.updatePlaceholders(post).subscribe((data) => {
      console.log(data);
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.placeholderService
      .createPlaceholders(this.form.value)
      .subscribe((data) => {
        console.log(data);
        this.filterPlaceholdersArray.push(data);
      });
  }
}
