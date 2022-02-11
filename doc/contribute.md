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
- [ ] Use CSS-in-JS.
  - [ ] Radix-ui is a shit. Let's try build component by ourself.
  - [x] I like styled-system. I can try it.
  - [x] I hate styled-system. Let's try theme-ui.
  - [x] How about radix-ui?
- [ ] Remove typescript's warning and error.
- [ ] Update test.
  - [ ] Add test for `News`.
  - [ ] Add test for `Carousel`.
  - [ ] And so on.
  - [x] Two toggle to change dark mode. make sure they works well.
- [ ] Add a user entrypoint.
  - [ ] Put a button.
  - [ ] Add a router.
- [ ] Use `deno` instead of `node.js`.
- [ ] Remove `any` in `.ts` file.
- [ ] Add cache for picute.
- [ ] Make test runable.
- [ ] Better color mode.
- [ ] Fix bug:

  Warning: Cannot update a component (`TopLevelColorModeProvider`) while
  rendering a different component (`DarkToggle`). To locate the bad setState()
  call inside `DarkToggle`, follow the stack trace as described in
  https://reactjs.org/link/setstate-in-render

  DarkToggle@http://127.0.0.1:3000/src/component/Nav.tsx:12:20

  withEmotionCache2/<@http://127.0.0.1:3000/node_modules/.vite/theme-ui.js?
  v=0b85f029:1314:45
- [x] Change color.
- [x] Add news.
- [x] Remove `class.ts`.

[joshbuchea/git-commit-message]: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
