import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MVP';
  data = {};

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.http.get('resource').subscribe(data => this.data = data);
  }
}
