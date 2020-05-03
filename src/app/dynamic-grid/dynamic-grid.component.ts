import {Component, OnInit} from '@angular/core';

export interface IHourInterval {
  hourInterval: number;
  name: string;
}

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnInit {

  hourIntervalDropdown: IHourInterval[] = [
    {
      hourInterval: 4,
      name: 'Hour Interval: 4 Hours'
    },
    {
      hourInterval: 6,
      name: 'Hour Interval: 6 Hours'
    },
    {
      hourInterval: 24,
      name: 'Hour Interval: 24 Hours'
    }
  ];

  selectedInterval;
  savedData;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeDataTableValues(interval) {
    console.log(interval);
    this.selectedInterval = interval;
  }

  showSavedData(data) {
    this.savedData = data;
  }

}
