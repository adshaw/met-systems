import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [DataTableComponent],
  exports: [
    DataTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    CdkTableModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatDividerModule,
    HttpClientModule
  ]
})
export class DataTableModule {
}
