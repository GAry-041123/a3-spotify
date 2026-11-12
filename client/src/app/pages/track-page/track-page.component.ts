import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, from, of, switchMap, takeUntil } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
  standalone: false
})
export class TrackPageComponent implements OnInit, OnDestroy {
  trackId: string;
  track: TrackData;

  loading = false;
  error = '';
  private destroyed = new Subject<void>();

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    // React to ID changes even when Angular reuses the same page component.
    // switchMap prevents an older request from replacing the newest page.
    this.route.paramMap.pipe(
      switchMap(params => {
        this.trackId = params.get('id');
        this.track = null;
        this.error = '';
        this.loading = true;
        return from(Promise.all([
          this.spotifyService.getTrack(this.trackId)
        ])).pipe(catchError(() => {
          this.error = 'Could not load this track. Check that the server is running and reload the page.';
          return of(null);
        }));
      }),
      takeUntil(this.destroyed)
    ).subscribe(result => {
      this.loading = false;
      if (result) { [this.track] = result; }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
