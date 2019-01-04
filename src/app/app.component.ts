import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TweetResponseModel } from './tweet-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  tweets: Observable<TweetResponseModel[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.tweets = this.getTweets();
  }

  getTweets(): Observable<TweetResponseModel[]> {
    const url = 'http://localhost:7890/1.1/statuses/user_timeline.json';
    return this.http.get<TweetResponseModel[]>(url, {
      params: {
        count: '30',
        screen_name: 'makeschool'
      }
    });
  }
}
