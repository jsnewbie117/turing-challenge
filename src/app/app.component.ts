import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { TweetResponseModel } from './tweet-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  tweets: Observable<TweetResponseModel[][]>;

  users = [ '@makeschool', '@newsycombinator', '@ycombinator' ];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.tweets = zip(...this.users.map(user => this.getTweets(user)))
      .pipe(map(results => {
        return results;
      }));
  }

  getTweets(username: string): Observable<TweetResponseModel[]> {
    const url = 'http://localhost:7890/1.1/statuses/user_timeline.json';
    return this.http.get<TweetResponseModel[]>(url, {
      params: {
        count: '30',
        screen_name: username
      }
    });
  }
}
