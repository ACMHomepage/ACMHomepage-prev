How To Contribute
===============================================================================

Git Commit Message Style
-------------------------------------------------------------------------------

Like [this rule][joshbuchea/git-commit-message] but changed something.

* 80 character each line.
* Use Markdown syntax.
* Head: `<type>: <subject>`.
  * `<type>`:
    * `feat`: Add a new feature.
    * `fix`: Fix a bug.
    * `docs`: Documenttation.
    * `style`: Just change the code's style or just fix typo.
    * `refactor`: Not add a new feature, neither fix a bug. Just make code
      clear than before.
    * `test`: About test.
    * `chore`: Updating grunt tasks etc; no production code change.
  * `<subject>`, Make sure the first character is UPPERCASE and has a space
    before is. End by a period.

To-do Tree
-------------------------------------------------------------------------------
- [ ] Add a user entrypoint.
  - [ ] Add sign up / sign in.
  - [ ] Add sign out button in Nav and Dropdown.
  - [x] Put a button.
  - [x] Add a router.
  - [x] Add the mock for jwt.
- [ ] Remove typescript's warning and error.
- [ ] Update test.
  - [ ] Add test for `News`.
  - [ ] Add test for `Carousel`.
  - [ ] And so on.
  - [x] Two toggle to change dark mode. make sure they works well.
- [ ] Use `deno` instead of `node.js`.
- [ ] Remove `any` in `.ts` file.
- [ ] Add cache for picute.
- [ ] Make test runable.
- [ ] Better color mode.
- [ ] How about add sx prop in theme-ui's Global?
- [ ] Emmm... So how about let every page know the before scroll position.
- [ ] Let the `ACM Homepage` in `Nav` be a button.
- [ ] Remove warning of msw when it ask for picture.
- [ ] Now we have `News` component and `News` page. Try to remove one or
  something else.
- [ ] How can I use typedoc?
- [ ] Make the Nav has bigger place to touch.
- [ ] Deal with JWT + cookie + CORS.
- [ ] Work with HttpOnly cookie.
- [ ] Add e2e test.
- [ ] Update component PureSwitch with sx prop.
- [ ] Add favicon.ico.
- [x] Reduce ReactDOM's size.
- [x] Build component.
- [x] Add news' detail page.

[joshbuchea/git-commit-message]: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
