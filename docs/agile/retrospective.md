# Sprint retrospective

## What went well

The app now has accounts, trip listings, stories, and private messages. The client screens and the API use the same field names, so a signed-in member can publish a trip and open a chat.

## What was difficult

The course checklist and the product features were built in separate steps. Tests, license tracking, and the GitHub Actions pipeline were still missing after the screens worked.

## What we will change next time

- Open a pull request for each large change and reply to review comments before merging.
- Run `npm run test:coverage` in `server` before pushing.
- Tag a release with `v1.0.0` only after the tests pass on GitHub.
