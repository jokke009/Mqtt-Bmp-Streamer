# Mqtt-Bmp-Streamer
[![TypeScript version][ts-badge]][typescript-30]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![Build Status][travis-badge]][travis-ci]
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]


Written in Typescript, a service that publishes byte data to a broker, which can then be consumed by an ESP device. 
In this example, we subscribe to a an atom feed from MDBG.net, a great site for looking up words. They also provide a 'word of the day' feed. The example uses the feed to generate 2 characters which can be converted to bitmap byte arrays which can then be published to the broker.

What's included:

+ [TypeScript][typescript] [3.0][typescript-30],
+ [TypeScript-Logging][typescript-logging] [3.0][typescript-30],
+ [TSLint 5][tslint] with [Microsoft rules][tslint-microsoft-contrib],
+ [Jest][jest] unit testing and code coverage,
+ Type definitions for Node.js v8 and Jest,
+ [Prettier][prettier] to enforces a consistent code style (but it's optional),
+ [NPM scripts for common operations](#available-scripts),
+ a simple example of TypeScript code and unit test,
+ .editorconfig for consistent file format.

## Quick start

This project is intended to be used with v8 (LTS Carbon) release of [Node.js][nodejs] or newer and [NPM][npm]. Make sure you have those installed. Then just type following commands:

```sh
git clone https://github.com/jokke009/Mqtt-Bmp-Streamer
cd node-typescript-boilerplate
npm install
```

or just download and unzip current `master` branch:

```sh
wget https://github.com/jokke009/Mqtt-Bmp-Streamer/archive/master.zip -O node-typescript-boilerplate
unzip Mqtt-Bmp-Streamer && rm Mqtt-Bmp-Streamer.zip
```

Now start adding your code in the `src` and unit tests in the `__tests__` directories. Have fun and build amazing things 🚀

### Unit tests in JavaScript

Writing unit tests in TypeScript can sometimes be troublesome and confusing. Especially when mocking dependencies and using spies.

This is **optional**, but if you want to learn how to write JavaScript tests for TypeScript modules, read the [corresponding wiki page][wiki-js-tests].

## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests


## License
Licensed under the MIT. See the [LICENSE](https://github.com/jokke009/Mqtt-Bmp-Streamer/blob/master/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.0-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%208.9-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v8.x/docs/api/
[travis-badge]: https://travis-ci.org/jsynowiec/node-typescript-boilerplate.svg?branch=master
[travis-ci]: https://travis-ci.org/jsynowiec/node-typescript-boilerplate
[typescript]: https://www.typescriptlang.org/
[typescript-logging]: https://www.npmjs.com/package/typescript-logging
[typescript-30]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg
[donate]: http://bit.ly/donate-js
[github-watch-badge]: https://img.shields.io/github/watchers/jsynowiec/node-typescript-boilerplate.svg?style=social
[github-watch]: https://github.com/jsynowiec/node-typescript-boilerplate/watchers
[github-star-badge]: https://img.shields.io/github/stars/jsynowiec/node-typescript-boilerplate.svg?style=social
[github-star]: https://github.com/jsynowiec/node-typescript-boilerplate/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20this%20Node.js%20TypeScript%20boilerplate!%20https://github.com/jsynowiec/node-typescript-boilerplate%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/jsynowiec/node-typescript-boilerplate.svg?style=social
[jest]: https://facebook.github.io/jest/
[tslint]: https://palantir.github.io/tslint/
[tslint-microsoft-contrib]: https://github.com/Microsoft/tslint-microsoft-contrib
[flow-boilerplate]: https://github.com/jsynowiec/node-flowtype-boilerplate
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io