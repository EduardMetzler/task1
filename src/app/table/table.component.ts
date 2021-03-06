import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { OnePost } from '../interface'
import { PlaceholderService } from '../service/placeholder.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() filterPlaceholdersArray: OnePost[] | any = []

  @Output() updatePostId = new EventEmitter<string>()
  @Output() deletePostId = new EventEmitter<number>()

  // users$=this.placeholderService.users$

  defaultSort = {
    type: 'asc',
    key: 'id',
  }

  constructor(
    private placeholderService: PlaceholderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sortPosts()
  }

  sort(property: string) {
    console.log(this.filterPlaceholdersArray.length)

    const { key, type } = this.defaultSort
    if (property === key) {
      if (type === 'asc') {
        this.defaultSort = {
          key,
          type: 'desc',
        }
      } else {
        this.defaultSort = {
          key,
          type: 'asc',
        }
      }
    } else if (property !== key) {
      this.defaultSort = {
        key: property,
        type: 'asc',
      }
    }

    this.sortPosts()
  }

  sortPosts() {
    switch (this.defaultSort.type) {
      case 'desc':
        this.filterPlaceholdersArray.sort((a: any, b: any) => {
          if (a[this.defaultSort.key] < b[this.defaultSort.key]) {
            return 1
          }
          if (a[this.defaultSort.key] > b[this.defaultSort.key]) {
            return -1
          }
          return 0
        })
        break
      case 'asc':
      default:
        this.filterPlaceholdersArray.sort((a: any, b: any) => {
          if (a[this.defaultSort.key] > b[this.defaultSort.key]) {
            return 1
          }
          if (a[this.defaultSort.key] < b[this.defaultSort.key]) {
            return -1
          }
          return 0
        })
        break
    }
  }

  postDelete(id: any) {
    this.deletePostId.emit(id)
  }

  postUpdate(id: any) {
    this.updatePostId.emit(id)
  }

  toPostDetails(id: string) {
    this.router.navigate([`post/${id}`])
  }
}
