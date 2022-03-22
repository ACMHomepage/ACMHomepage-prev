# Scripts

## Format code

You can use `yarn format` to format all code prettier support.

## Show all files' name

You can just run:

```shell
$ ZX="$(yarn bin)/zx"
$ $ZX scripts/find_all_file.mjs
```

If you have `zx` in global, you can just run `zx scripts/find_all_file.mjs`.

### Example

We can use it to find all `TODO` in our project:

```shell
$ $ZX scripts/find_all_file.mjs | xargs egrep "TODO"
./back/src/graphql/type/user.js:    // TODO: Use bcrypt rather than plain text.
./back/src/graphql/type/user.js:    // TODO: Use bcrypt rather than plain text.
./front/src/page/Register.tsx:  // TODO: Return error if the nickname, email or password is empty.
./front/src/page/Register.tsx:  // TODO: We do not handler if email is already in database.
./front/src/page/Register.tsx:  // TODO: We do not show the helpful message in different state.
./front/src/page/PostNews.tsx:    // TODO: handle those cases.
./front/src/page/PostNews.tsx:    // TODO: Better idea: Add a image post bar, which can turn a image to a
./front/src/component/SignButton.tsx:    // TODO: Let it can sign out.
./front/src/component/Header.tsx:// TODO: Fix it. Use arrow funtion. Now we cannot, because it has bug in
./front/src/component/Input.tsx:  // TODO: This is ugly, try to build a new component Textarea.
./front/src/store/authSlice.ts:    // TODO: Add error message for user. And UnloggedWithError state.
./front/src/store/authSlice.ts:  // TODO: deal with loading, error, and data.
./front/src/mock/handler/News.ts:      summary: 'TODO',
```
