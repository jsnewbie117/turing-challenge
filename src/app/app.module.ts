import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatImportsModule } from './@shared/mat-imports.module';
import { CustomPipesModule } from './@shared/pipes/custom-pipes.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatImportsModule,
    CustomPipesModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
