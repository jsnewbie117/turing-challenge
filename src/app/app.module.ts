import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatImportsModule } from './@shared/mat-imports.module';
import { CustomPipesModule } from './@shared/pipes/custom-pipes.module';

import { AppComponent } from './app.component';
import { LayoutSettingsComponent } from './layout-settings/layout-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatImportsModule,
    CustomPipesModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
