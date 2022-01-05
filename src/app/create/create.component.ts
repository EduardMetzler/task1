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

  users$ = combineLatest([this.placeholderService.users$]).pipe(
    map(([users]) => {
      this.userList = users
      console.log(this.userList)
      if (this.userList.length > 0) {
        console.log(this.userList)
        this.form.patchValue({
          userId: this.userList[0].id,
          userName: this.userList[0].username,
        })
      }
      // console.log(this.form.value)

      return users
    }),
  )
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    userId: new FormControl(),
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),

    userName: new FormControl(''),
  })

  ngOnInit(): void {
    this.placeholderService.getPlaceholders()

    this.userSubscribe = this.users$.subscribe()
  }

  backToList() {
    this.router.navigate([``])
    console.log(this.form.value)
  }

  onSubmit() {
    this.placeholderService.createPlaceholders(this.form.value)
    console.log(this.form.value)
  }

  userIdandNameSave(e: any) {

    const myUserName = this.userList.find((item: any) => {
      return item.id === +e.target.value
    })


    this.form.patchValue({
      userId: e.target.value,
      userName: myUserName.username,
    })
  }
  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe()
  }
}
