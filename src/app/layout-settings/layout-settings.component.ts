import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { TweetResponseModel, TweetUserModel } from '../@shared/models/tweet-response.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

export interface UserSettingsModel {
  username: string;
  user: TweetUserModel;
  useGlobal?: boolean;
  tweetLimit?: number;
  fromDate?: Date;
  toDate?: Date;
  settingsForm?: FormGroup;
  tweets?: TweetResponseModel[];
  editMode?: boolean;
  fetchingTweets?: boolean;
}

@Component({
  selector: 'app-layout-settings',
  templateUrl: './layout-settings.component.html',
  styleUrls: [ './layout-settings.component.scss' ]
})
export class LayoutSettingsComponent implements OnInit {

  @Input()
  defaultColor = '#1DA1F2';

  @Input()
  settings: UserSettingsModel[];

  globalsForm: FormGroup;

  maxDate = new Date;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.initGlobalsForm();
    this.initSettings();
  }

  initGlobalsForm() {
    this.globalsForm = this.fb.group({
      defaultColor: [ this.defaultColor ],
      tweetLimit: [ 30 ],
      startDate: [ '' ],
      endDate: [ '' ]
    });
  }

  initSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));

    if ( savedSettings ) {
      savedSettings.forEach(setting => {
        this.applySettings(this.addUser(setting.user, setting));
      });
    } else {
      const defaultUsers = [ 'makeschool', 'newsycombinator', 'ycombinator' ];
      merge(...defaultUsers.map(user => this.getUser(user)))
        .subscribe(value => this.applySettings(this.addUser(value)));
    }
  }

  searchUsers(username) {
    return this.http.get('http://localhost:7890/1.1/users/search.json', {
      params: {
        count: '5',
        q: username
      }
    });
  }

  getUser(username) {
    return this.searchUsers(username).pipe(map((results: any[]) => {
      return results.find(result => result.screen_name.toLowerCase() === username.toLowerCase());
    }));
  }

  addUser(user: TweetUserModel, setting?: UserSettingsModel) {
    const userSettings: UserSettingsModel = {
      ...this.initDefaultSetting(),
      ...setting,
      username: user.screen_name,
      user: user
    };
    this.toggleEditSetting(userSettings, false);
    this.settings.push(userSettings);
    return userSettings;
  }

  initDefaultSetting(): UserSettingsModel {
    return {
      username: '',
      user: null,
      useGlobal: false,
      tweetLimit: 30,
      fromDate: null,
      toDate: null,
      settingsForm: this.fb.group({
        tweetLimit: [ 30 ],
        useGlobal: [ false ],
        fromDate: [ null ],
        toDate: [ null ]
      }),
      tweets: null,
      editMode: false,
      fetchingTweets: false
    };
  }

  toggleEditSetting(setting: UserSettingsModel, enable: boolean, event?: MouseEvent) {
    const { useGlobal, tweetLimit, fromDate, toDate } = setting;
    setting.settingsForm.patchValue({
      useGlobal, tweetLimit, fromDate, toDate
    });
    if ( enable ) {
      setting.settingsForm.enable();
    } else {
      setting.settingsForm.disable();
    }
    setting.editMode = enable;
    if ( event ) {
      event.stopPropagation();
    }
  }

  applySettings(setting: UserSettingsModel) {
    if ( setting.settingsForm.invalid ) {
      return;
    }

    const global = this.globalsForm.getRawValue();
    const { useGlobal, tweetLimit, toDate, fromDate } = setting.settingsForm.value;

    setting.useGlobal = useGlobal;
    setting.tweetLimit = useGlobal ? global.tweetLimit : tweetLimit;
    setting.toDate = useGlobal ? global.toDate : toDate;
    setting.fromDate = useGlobal ? global.fromDate : fromDate;

    this.toggleEditSetting(setting, false);

    setting.fetchingTweets = true;
    const url = 'http://localhost:7890/1.1/statuses/user_timeline.json';
    this.http.get(url, {
      params: {
        count: '' + setting.tweetLimit,
        screen_name: setting.username
      }
    }).subscribe((value: TweetResponseModel[]) => {
      setting.tweets = value.filter(tweet => {
        const createdDate = +new Date(tweet.created_at);
        const to = setting.toDate;
        const from = setting.fromDate;
        return (!to || createdDate <= +new Date(to)) && (!from || createdDate >= +new Date(from));
      });
      setting.fetchingTweets = false;
    });
  }

  saveSettings() {
    const settingsTemp = this.settings.map(setting => {
      const temp = <UserSettingsModel>{ ...setting };
      delete temp.settingsForm;
      delete temp.tweets;
      return temp;
    });
    localStorage.setItem('settings', JSON.stringify(settingsTemp));
    this.snackBar.open('Settings saved on device', '', <MatSnackBarConfig>{
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.settings, event.previousIndex, event.currentIndex);
  }

}
