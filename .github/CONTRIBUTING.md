# Contributor Guidelines

🌟Thank you🌟 for contributing to the Lotus app! 🙏🏼

Consider [opening an issue][new-issue] for any of the following:

* questions
* bugs or problems
* feature requests

Want to contribute code to the Lotus app? Awesome! 🌟 Check out [GitHub's Open Source Guide][gh-contributing] on contributing to open source projects.

[View the complete developer documentation here.][developers]

[View documentation for maintainers.][maintainers]

## Contents

<!-- TOC -->

- [Project Principles](#project-principles)
- [Building & Testing the App](#building--testing-the-app)
- [Project Structure](#project-structure)
- [App Structure](#app-structure)
- [Directory Structure](#directory-structure)
- [Pages & Components](#pages--components)
- [Offline Functionality](#offline-functionality)
- [Styleguides](#styleguides)
- [Inspiration](#inspiration)

<!-- /TOC -->

## Project Principles

This project is driven by the needs of documentary and descriptive linguists, and so its development should be sensitive to the following principles:

- **accessibility** (e.g. keyboard entry and manipulation, inclusive design, progressive enhancement)
- **broadly applicable** (e.g. only features many linguists are expected to use; no project-specific features)
- **community-oriented** (e.g. accessible to community members, access controlled by community members)
- **data freedom** (e.g. import/export in various formats, data longevity)
- **ethics and data privacy** (e.g. autonyms, choice of where data are stored, user permissions, access rights)
- **fieldwork-oriented** (e.g. works offline, launches quickly)
- **linguistically diverse** (e.g. support RTL and LTR writing systems, choice of font, choice of lexical category)
- **open source** (e.g. free, easy to contribute, rely only on well-supported tools/libraries, well-documented)
- **scientific transparency** (e.g. ability to recreate data sets, faithfulness to original data, easily citable)

## Building & Testing the App

This project uses the following build and testing tools:

* [Babel][Babel]: Transpiles the latest JavaScript syntax to earlier versions that are compatible with most browsers.
* [Chai][Chai]: Assertion library.
* [Cypress][Cypress]: Runs both unit and integration tests.
* [ESBuild][ESBuild]: Bundles multiple JavaScript modules into a single file, to reduce the number of network requests made by the browser.
* [Handlebars][Handlebars]: Compiles the HTML for the app shell and pages. HTML components are written in Handlebars but with the `.html` extension.
* [Mocha][Mocha]: Runs unit tests.

The following build scripts are available:

* `npm run build`: Builds the production code for the app and outputs to `/dist`. Build scripts are located in `/build`. Individual build steps can be run with the following commands:
  - `npm run build:copy`: copies static assets
  - `npm run build:css`
  - `npm run build:html`
  - `npm run build:js`

* `npm start`: Run a local test server for development. Defaults to port `3000` (set `process.env.PORT` to change this).

* `npm test`: Runs both unit and integration tests. By default tests are run on the command line. You can run unit tests and integration tests individually with the following commands:
  - `npm run test:unit`
  - `npm run test:integration`
  - `npm run cypress`: runs integration tests manually in Cypress dashboard

## Project Structure

Folder     | Description
-----------|--------------------------------------------------------------------------------------------------------------------------------------------------
`/.github` | Developer documentation.
`/build`   | Scripts to build the production version of the app.
`/dist`    | Production code for the app. The contents of this folder are deployed to the production server on release, and a staging server on pull requests.
`/docs`    | Developer documentation. The contents of this folder are deployed to https://developer.digitallinguistics/app.
`/src`     | Source code for the app. Test files should live alongside their source components.
`/test`    | Configuration code and fixtures for tests. Test specs should _not_ be placed here.

## App Structure

The Lotus app follows a typical [app shell model][app-shell-model]. A lightweight app skeleton with minimal content is delivered to the browser, and everything else is then loaded dynamically or lazy-loaded. Think of the app shell as your development environment—it makes certain global features and variables available for you to work with, such as predefined HTML regions, global CSS variables, and a global `app` JavaScript object with methods for updating settings, accessing the database, etc. etc.

The Lotus app is also a [Progressive Web App][PWA] (PWA), meaning that it works offline and is installable as a native app on devices. Pull requests should adhere to the principles of PWAs.

### HTML

The app has the following major HTML regions:

```html
<body id=app class=app>

  <header><!-- The app banner, containing the app logo and high-level app controls --></header>

</body>
```

## Directory Structure

The `/src` folder contains the following:

Folder          | Description
----------------|-------------------------------------------------------------------------------------------------------------------------------------------
`/app`          | The App is a special top-level component, globally accessible with the `app` variable. Also contains components specific to the app shell.
`/components`   | Components that are shared across pages.
`/core`         | High-level JavaScript modules whose functionality is shared across components.
`/images`       | Images and icons used in the app.
`/sass`         | Global SASS variables and utility classes that are used across pages.
`/models`       | Data models (e.g. Language, Text, etc.).
`/pages`        | Each subfolder contains all the code for a single "page".
`/services`     | JavaScript modules which manage access to services like databases and APIs.
`/utilities`    | JavaScript utilities that are reused across components.
`/vendor`       | Third-party scripts. These are self-hosted alongside the app.
`manifest.json` | Web app manifest for installing the site as a web app.

## Pages & Components

The code for the app consists of the app shell, plus one bundle of code for each page within the app. The HTML, CSS, and JavaScript for each page are loaded dynamically when that page is loaded. (These files are cached by a service worker in advance, so the user doesn't have to wait for them to be fetched from the server.) So all of the various code and components for the Languages page, for example, are compiled into the following three files:

* `Languages.html`
* `Languages.css`
* `Languages.js`

Each component should have its own folder within the page it is used, and contain all the necessary HTML, CSS/SASS, and JavaScript for that component, like so:

```
/pages
  /LanguagesPage
    /LanguagesList
      - LanguagesList.html
      - LanguagesList.sass
      - LanguagesList.js
```

* The app shell is treated as a special top-level component and located in the `/app` folder.
* Components that are specific to the app shell should be placed in the `/app` folder instead of a page folder.
* Components that are used across pages should be placed in the `/components` folder instead of a page folder.

The HTML build step will insert each component's HTML into a `<template id={component-name}-template>` tag in that page's HTML (or the app shell, if the component is shared across pages). Your JavaScript component should load that template using `document.querySelector('#{component-name}-template')`.

The CSS for each component will be loaded along with the page's CSS.

Each page's JavaScript is responsible for loading its own components, and they in turn are responsible for loading any subcomponents.

## Offline Functionality

The Lotus app is designed to be an offline web app. As such, all assets required to run the app must be available offline. This functionality is achieved via the `src/offline-worker.js` file. This file caches all the required assets for the app. It uses the file `dist/cache.json` to determine which files need to be cached. `cache.json` is generated during the build process (by `buildCache.js`) by creating a list of all files present in the `dist/` folder (except for `offline-worker.js` itself).

## Styleguides

JavaScript and CSS / SASS code should be linted before opening a pull request.

* JavaScript code is linted with [ESLint][ESLint]. The ESLint config file for this project is located at `.eslintrc.yml`.
* SASS / CSS code is linted with [Stylelint][Stylelint]. The Stylelint config file for this project is located at `.stylelintrc.yml`.

JavaScript code comments follow [JSDoc][JSDoc] conventions for describing code.

## Inspiration

Other single-page apps or tools this project sometimes mimics:

* GitHub (web)
* GitHub (desktop)
* [Mandala][Mandala]
* [Microsoft Todo][MSTodo] (web)
* [SayMore][SayMore]
* Slack (desktop)
* Trello

<!-- LINKS -->
[app-shell-model]: https://developers.google.com/web/fundamentals/architecture/app-shell
[Babel]:           https://babeljs.io/
[Chai]:            https://www.chaijs.com/
[Cypress]:         https://www.cypress.io/
[developers]:      https://developer.digitallinguistics.io/app
[ESBuild]:         https://esbuild.github.io/
[ESLint]:          https://eslint.org/
[gh-contributing]: https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution
[Handlebars]:      https://handlebarsjs.com/
[JSDoc]:           https://jsdoc.app/
[maintainers]:     https://github.com/digitallinguistics/app/blob/main/.github/MAINTAINERS.md
[Mandala]:         https://audio-video.shanti.virginia.edu/video/gurung-man-describes-otar-village
[Mocha]:           https://mochajs.org/
[MSTodo]:          https://to-do.live.com/
[new-issue]:       https://github.com/digitallinguistics/app/issues/new
[PWA]:             https://developers.google.com/web/updates/2015/12/getting-started-pwa
[SayMore]:         https://software.sil.org/saymore/
[Stylelint]:       https://stylelint.io/
