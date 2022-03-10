ACM-Homepage
===============================================================================

ACM-homepage is a full-stacked project for Soochow University's ACM/ICPC team.

### Frontend

It uses [react][], [node.js][nodejs], [yarn][], [vite][], [theme ui][theme-ui]
to build nice frontend. And also [msw][], [faker.js][faker-js] (We support
Marak and what Marak do, and that's why the project is under GPL license. We
also believe the opensource spirit is eternal and free software shall never be
chained by the giants.) to mock and test.

### Backend

We utilize [MySQL][mysql] and [node.js][nodejs] to build the backend. As of
now, the backend is separate from the frontend. We will implement front-end and
back-end communication in subsequent versions.

How to run
-------------------------------------------------------------------------------

We think the best way to run our website is using docker-compose:

``` shell
$ docker-compose up
```

Contribute
-------------------------------------------------------------------------------

[Click](./docs/contribute.md) to see how to contribute.

License
-------------------------------------------------------------------------------

GPL.

[react]: https://reactjs.org/
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[snowpack]: https://www.snowpack.dev/
[vite]: https://vitejs.dev/
[tailwindcss]: https://tailwindcss.com/
[theme-ui]: https://theme-ui.com/
[headlessui]: https://headlessui.dev/
[msw]: https://mswjs.io/
[faker-js]: https://fakerjs.dev
[mysql]: https://www.mysql.com/
