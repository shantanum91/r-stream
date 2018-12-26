import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  videos;
  videoUrl;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.http.get('/api/videos').subscribe(videos => this.videos = videos);
  }

  play(video) {
    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('/api/videos/video?filename=' + encodeURIComponent(video));
  }

}
