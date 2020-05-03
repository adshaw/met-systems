import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DataTableComponent} from './data-table.component';
import {DataTableService} from './data-table.service';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {CdkTable} from '@angular/cdk/table';
import {of} from 'rxjs';

const mockData = {
  id: 1,
  name: 'MDE Item 1',
  time0: '',
  units: 'g/l'
};

const exampleData = [{
  'name': 'MDE Item 1',
  'interval': 24,
  'intervals': [
    {
      'time': '00:00',
      'value': '21'
    }
  ]
}];


describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let table: CdkTable<[]>;
  const dataSource = new MatTableDataSource([mockData]);
  const dataTableService = jasmine.createSpyObj('DataTableService', ['sendPostRequest']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [DataTableComponent],
      providers: [{provide: DataTableService, useValue: dataTableService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should form columns based on intervals', () => {
    component.originalColumnsDefs = [
      {columnDef: 'name', header: 'Measure point names', custom: true, sticky: true},
      {columnDef: 'units', header: 'Units', sticky: true}
    ];
    component.formColumnsBasedOnInterval(24);
    expect(component.columns.length).toEqual(3);
    component.formColumnsBasedOnInterval(6);
    expect(component.columns.length).toEqual(6);
    component.formColumnsBasedOnInterval(4);
    expect(component.columns.length).toEqual(8);
  });

  it('should add', () => {
    table = component.table;
    const interval = {columnDef: 'time24', header: '00:00', custom: true};
    component.timeIntervalColumns = [interval];
    component.add();
    fixture.detectChanges();
    expect(component.dataSource.length).toEqual(1);
  });

  it('should save', () => {
    dataTableService.sendPostRequest.and.returnValue(of(exampleData));
    component.dataSource = [mockData];
    const interval = {columnDef: 'time24', header: '00:00', custom: true};
    component.timeIntervalColumns = [interval];
    component.save();
    fixture.detectChanges();
    expect(component.dataSource.length).toEqual(1);
  });
});
