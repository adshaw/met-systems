import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {IColumns, IMetSystem, ITimeInterval} from './table-model';
import {DataTableService} from './data-table.service';
import {first, tap} from 'rxjs/operators';

// const exampleData = [{
//   'name': 'MDE Item 1',
//   'interval': 24,
//   'intervals': [
//     {
//       'time': '00:00',
//       'value': '21'
//     }
//   ]
// }];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() set selectedInterval(value) {
    this._selectedInterval = value;
    this.formColumnsBasedOnInterval(value);
  }

  @Output() dataToEmit = new EventEmitter<string>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  originalColumnsDefs: IColumns[] = [
    {columnDef: 'name', header: 'Measure point names', custom: true, sticky: true},
    {columnDef: 'units', header: 'Units', sticky: true}
  ];

  displayedColumns: string[];
  columns: IColumns[];
  dataSource = [];
  timeIntervalColumns: IColumns[];
  isLoading = false;

  private _selectedInterval: number;

  constructor(private dataTableService: DataTableService) {
  }

  formColumnsBasedOnInterval(interval) {
    this.timeIntervalColumns = [];
    this._selectedInterval = interval;
    this.timeIntervalColumns = [...Array(24 / interval)].map((v, i) => {
      const header = (i * interval < 10) ? `0${0 + i * interval}:00` : `${0 + i * interval}:00`;
      return {
        columnDef: `time${i * interval}`,
        header: header,
        custom: true
      };
    });
    this.columns = [...this.originalColumnsDefs, ...this.timeIntervalColumns];
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  save() {
    this.isLoading = true;
    const myData: IMetSystem[] = this.dataSource.map((row) => {
      const intervalObj = {name: row.name, interval: this._selectedInterval};
      const intervals: ITimeInterval[] = this.timeIntervalColumns.map((column: IColumns) => {
        return {time: column.header, value: row[column.columnDef]};
      });
      return {...intervalObj, intervals: intervals};
    });
    console.log('Sending Data...', myData);
    this.dataTableService.sendPostRequest(myData).pipe(
      first(),
      tap(data => this.isLoading = false)
    ).subscribe(data => this.dataToEmit.emit(data));
  }

  add() {
    const index = this.dataSource.length;
    const intervalObj = {id: index + 1, name: `MDE Item ${index + 1}`, units: 'g/l'};
    this.timeIntervalColumns.forEach((column: IColumns) => {
      intervalObj[column.columnDef] = '';
    });
    this.dataSource.push(intervalObj);
    console.log('datasource', this.dataSource);
    this.updateTableView();
  }

  updateTableView() {
    this.table.renderRows();
  }

}
