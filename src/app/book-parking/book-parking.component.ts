import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent {
  show: boolean = false;
  @Output() changeTab = new EventEmitter<any>();

  out(event: any) {
    this.changeTab.emit(event);
  }

  selectSlot() {

  }

}
