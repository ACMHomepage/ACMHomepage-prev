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
- [ ] Change color.
  - [ ] How about use color `primary` than just `green`?
  - [ ] In dark mode, use darked color than just `white`.
- [ ] Use `vite` instead of `snowpack`. See [here][our-reply-about-react-is].
- [ ] Try to remove `prop-types` in `package.json`. See
  [here][our-issue-about-prop-types].
- [ ] Update test.
  - [x] Two toggle to change dark mode. make sure they works well.
  - [ ] Add test for News.
  - [ ] And so on.
- [ ] Add a user entrypoint.
  - [ ] Put a button.
  - [ ] Add a router.
- [ ] Add news.
- [ ] Use `deno` instead of `node.js`.
- [ ] Make `Nav` sticky.

[joshbuchea/git-commit-message]: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
[our-reply-about-react-is]: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
[our-issue-about-prop-types]: https://github.com/lucide-icons/lucide/issues/486
