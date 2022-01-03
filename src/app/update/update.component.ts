import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PlaceholderService } from '../service/placeholder.service';
import { map } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OnePost } from '../interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private placeholderService: PlaceholderService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  myPost:OnePost[] = [{ userId: '', id: 1, title: '', body: '' }];

  posts$ = combineLatest([this.placeholderService.posts$]).pipe(
    map(([posts]) => {
      posts.filter((post:OnePost) => post.id === +this.id);
      console.log(posts.filter((post:OnePost) => post.id === +this.id));
      this.myPost = posts.filter((post:OnePost) => post.id === +this.id);
      console.log(this.myPost);
      return posts.filter((post) => post.id === +this.id);
    })
  );
  // form: FormGroup = new FormGroup({
  //   id: new FormControl('101'),
  //   userId: new FormControl('12'),
  //   title: new FormControl(this.myPost[0].title, Validators.required),
  //   body: new FormControl(this.myPost[0].body, Validators.required),
  // });

  id: number = 0;

  ngOnInit() {
    this.placeholderService.getPlaceholders();

    this.id = this.route.snapshot.params['id'];
  }

  backToList() {
    this.router.navigate([``]);
  }

  onSubmit() {
    this.placeholderService.updatePlaceholders(this.myPost[0]);
  }
}
