import { Component, OnInit } from '@angular/core';
import { UserSettingsModel } from './layout-settings/layout-settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  public settings: UserSettingsModel[];

  constructor() {
  }

  ngOnInit() {
    this.settings = [];
  }
}
