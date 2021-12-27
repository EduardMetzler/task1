import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaceholderService } from '../service/placeholder.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() filterPlaceholdersArray: any
  @Input() create: any

  @Output() updatePostId = new EventEmitter<string>();
  @Output() filterPlaceholders = new EventEmitter<any>();


  sortSwitch = [false, true, true]
  update = ""
  newValue = ""




  constructor(private placeholderService: PlaceholderService) { }

  ngOnInit(): void {

  }

  sort(type: any, n: number) {
    if (this.sortSwitch[n]) {
      this.filterPlaceholdersArray.sort((a: any, b: any) => {
        if (a[type] > b[type]) {
          return 1;
        }
        if (a[type] < b[type]) {
          return -1;
        }
        return 0;
      })

    }
    else {
      this.filterPlaceholdersArray.sort((a: any, b: any) => {
        if (a[type] < b[type]) {
          return 1;
        }
        if (a[type] > b[type]) {
          return -1;
        }
        return 0;
      })
    }

    this.sortSwitch[n] = !this.sortSwitch[n]



  }

  postDelete(id: any) {

    this.placeholderService.deletePlaceholders(id).subscribe((data) => {
      this.filterPlaceholdersArray = this.filterPlaceholdersArray.filter(
        (data: any) => data.id !== id
      )
      console.log(data, id)
    });


    setTimeout(() => {
      console.log(this.filterPlaceholdersArray)
      this.filterPlaceholders.emit(this.filterPlaceholdersArray);
    }, 1000)



  }

  postUpdate(id: any) {
    this.update = id
    const a = this.filterPlaceholdersArray.find((item: any) => item.id === id)
    this.newValue = a.body
    this.updatePostId.emit(id);

  }


}
