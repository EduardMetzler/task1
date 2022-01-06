import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { OnePost } from '../interface'
import { PlaceholderService } from '../service/placeholder.service'
import { combineLatest, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    private placeholderService: PlaceholderService,
    private router: Router,
  ) {}

  userList: any = []
  userSubscribe: any = null

  users$ = this.placeholderService.users$

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userId: new FormControl(null, Validators.required),
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),

    username: new FormControl(''),
  })

  ngOnInit(): void {
    this.placeholderService.getPlaceholders()
    this.placeholderService.getUsersList()
  }

  backToList() {
    this.router.navigate([``])
    console.log(this.form.value)
  }

  onSubmit() {
    console.log(this.form.value)

    this.placeholderService.createPlaceholders(this.form.value)
  }
}
