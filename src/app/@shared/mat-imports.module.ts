import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule, MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';


@NgModule({
  exports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class MatImportsModule {}
