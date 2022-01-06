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

  // users$ = combineLatest([this.placeholderService.users$]).pipe(
  //   map(([users]) => {
  //     // this.userList = users
  //     // console.log(this.userList)
  //     // if (this.userList.length > 0) {
  //     //   console.log(this.userList)
  //     //   this.form.patchValue({
  //     //     userId: this.userList[0].id,
  //     //     userName: this.userList[0].username,
  //     //   })
  //     // }

  //     return users
  //   }),
  // )


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


    // this.userSubscribe = this.users$.subscribe()

    // this.form.valueChanges.subscribe((selectedValue) => {
    //   console.log('form value changed')

    //   // if (this.form.value.userId != selectedValue.userId) {
    //   //   console.log('ssssssssssss')
    //   // }
    // })
  }

  backToList() {
    this.router.navigate([``])
    console.log(this.form.value)
  }

  onSubmit() {
    console.log(this.form.value)

    // const myUserName = this.userList.find((item: any) => {
    //   return item.id == this.form.value.userId
    // })
    // console.log(myUserName)

    // this.form.patchValue({
    //   userName: myUserName.username,
    // })
    this.placeholderService.createPlaceholders(this.form.value)
  }

  // ngOnDestroy(): void {
  //   this.userSubscribe.unsubscribe()
  // }
}
