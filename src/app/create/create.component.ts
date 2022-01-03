import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnePost } from '../interface';
import { PlaceholderService } from '../service/placeholder.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private placeholderService: PlaceholderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.placeholderService.getPlaceholders();
  }

  form: FormGroup = new FormGroup({
    id: new FormControl('101'),
    userId: new FormControl('12'),
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  backToList() {
    this.router.navigate([``]);
  }

  onSubmit() {
    this.placeholderService.createPlaceholders(this.form.value);
  }
}
