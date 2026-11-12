import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService],
  standalone: false
})
export class SearchComponent {
  searchString = '';
  searchCategory = 'artist';
  searchCategories = ['artist', 'album', 'track'];
  resources: ResourceData[] = [];
  resultCategory = 'artist';
  loading = false;
  searched = false;
  error = '';
  private requestId = 0;

  constructor(private spotifyService: SpotifyService) { }

  get tracks(): TrackData[] {
    return this.resultCategory === 'track' ? this.resources as TrackData[] : [];
  }

  async search() {
    // Ignore an older response when the query or category changes meanwhile.
    const requestId = ++this.requestId;
    const query = this.searchString.trim();
    const category = this.searchCategory;
    this.resources = [];
    this.error = '';
    this.searched = false;
    this.loading = false;
    if (!query) { return; }
    this.loading = true;
    try {
      const resources = await this.spotifyService.searchFor(category, query);
      if (requestId !== this.requestId) { return; }
      this.resources = resources;
      this.resultCategory = category;
      this.searched = true;
    } catch {
      if (requestId === this.requestId) {
        this.error = 'Search could not be completed. Check that the server is running and try again.';
      }
    } finally {
      if (requestId === this.requestId) { this.loading = false; }
    }
  }
}
