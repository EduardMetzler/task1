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

  myPost: any = { id: 1, title: '', body: '', userId: '' };

  posts$ = combineLatest([
    this.placeholderService.posts$,
    this.route.params,
  ]).pipe(
    map(([posts, paramsId]) => {
      const params = paramsId['id'];

      this.myPost = posts.find((post: any) => post.id === +params);

      return posts.find((post) => post.id === +params);
    })
  );
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userId: new FormControl(''),
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.posts$.subscribe();
    this.placeholderService.getPlaceholders();

    this.route.params;

    console.log(this.myPost);
    setTimeout(() => {
      this.form.patchValue({
        id: this.myPost.id,
        userId: this.myPost.userId,
        title: this.myPost.title,
        body: this.myPost.body,
      });
    }, 1000);
  }

  backToList() {
    this.router.navigate([``]);
  }

  onSubmit() {
    this.placeholderService.updatePlaceholders(this.form.value);
  }
}
