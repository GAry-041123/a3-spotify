INF 133 A3 - Spotify Browser
Zirui Deng | dengz7@uci.edu
A3 Pairs: Group 53 | Completed individually
Repository: https://github.com/GAry-041123/a3-spotify

1. Completed features / self-assessment
10/10 required points:
- 1/1: Communication with the course dummy webserver.
- 1/1: User name, profile image, and Spotify profile link.
- 3/3: Artist/album/track search, carousels, and linked track tables.
- 3/3: Artist details, followers, popularity, albums, and top tracks.
- 1.5/1.5: Album details, artists, popularity, and tracks.
- 0.5/0.5: Track details, artists, album, duration, and popularity.

2. Time spent
8 hours.

3. Resources and AI assistance
- Assignment: https://canvas.eee.uci.edu/courses/85916/assignments/1904213
- Starter: https://github.com/travislindenreid/a3-spotify
- Course-provided dummy_webserver.zip on Canvas.
- https://angular.dev/guide/http/making-requests
- https://angular.dev/guide/templates/control-flow
- https://getbootstrap.com/docs/5.3/components/carousel/
- OpenAI Codex/ChatGPT assisted with implementing the assignment requirements,
  debugging, testing, documentation, packaging, and GitHub commits.

4. Collaboration
Completed individually, without a partner. AI assistance is disclosed above.

5. Bonus features
No extra-credit feature is claimed. The app also supports Enter-to-search,
automatic searches on category changes, loading/error/empty states, and
safe handling of outdated responses when searches or route IDs change.

6. Running and validation
Use the course dummy server; Spotify login, credentials, and Premium are
not required. Do not use the original webserver for this submission.

Terminal 1, from the Canvas dummy_webserver folder:
  npm ci
  npm start

Terminal 2, from this repository's client folder:
  npm ci
  npm start

Open http://localhost:4200. The backend runs at http://127.0.0.1:8888.
Internet access is needed for Bootstrap, fonts, and Spotify images.
The course server contains ten artists and may return fallback results.

Production build: run npm run build inside client.
Validation passed: production build, 13 independent functional check groups,
and Chrome interaction checks for all three searches and detail pages.
The functional checks cover service endpoints, resource parsing, search
ordering, errors, popularity, and route changes.
The starter's npm test is incompatible with Angular 19 because some
unchanged spec files still import the removed async testing helper.

The submission ZIP excludes node_modules, build/cache files, .git,
webserver, and the separately downloaded dummy_webserver, as permitted.

