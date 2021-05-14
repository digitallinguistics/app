# Contributing

🌟Thank you🌟 for contributing to the Lotus app! 🙏🏼

Consider [opening an issue][new-issue] for any of the following:

* questions
* bugs or problems
* feature requests

Want to contribute code to the Lotus app? Awesome! 🌟 Check out [GitHub's Open Source Guide][gh-contributing] on contributing to open source projects.

## Contents

<!-- TOC -->

- [Project Principles](#project-principles)
- [Building & Testing the App](#building--testing-the-app)
- [Project Structure](#project-structure)
- [App Structure](#app-structure)
- [Directory Structure](#directory-structure)
- [Pages & Components](#pages--components)
- [Styleguides](#styleguides)

<!-- /TOC -->

## Project Principles

This project is driven by the needs of documentary and descriptive linguists, and so its development should be sensitive to the following principles:

- **accessibility** (e.g. keyboard entry and manipulation)
- **broadly applicable** (e.g. only features many linguists are expected to use; no project-specific features)
- **community-oriented** (e.g. accessible to community members, access controlled by community members)
- **data freedom** (e.g. import/export in various formats)
- **ethics and data privacy** (e.g. autonyms, choice of where data are stored)
- **fieldwork-oriented** (e.g. works offline, launches quickly)
- **linguistically diverse** (e.g. support RTL and LTR writing systems, choice of font, choice of lexical category)
- **open source** (e.g. free, easy to contribute, rely only on well-supported tools/libraries, well-documented)

## Building & Testing the App

This project uses the following build and testing tools:

* [Babel][Babel]: Transpiles the latest JavaScript syntax to earlier versions that are compatible with most browsers.
* [Cypress][Cypress]: Runs both unit and integration tests.
* [ESBuild][ESBuild]: Bundles multiple JavaScript modules into a single file, to reduce the number of network requests made by the browser.

The following build scripts are available:

* `npm run build`: Builds the production code for the app and outputs to `/dist`. Build scripts are located in `/build`. Individual build steps can be run with the following commands:
  - `npm run build:css`
  - `npm run build:html`
  - `npm run build:js`

* `npm test`: Runs both unit and integration tests. You can also run them separately. By default tests are run on the command line. To run tests manually in the Cypress dashboard, use `npm run cypress`.
  - `npm run test:integration`
  - `npm run test:unit`
  - `npm run cypress`

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

The Lotus app follows a typical [app shell model][app-shell-model]. A lightweight app skeleton with minimal content is delivered to the browser, and everything else is then loaded dynamically or lazy-loaded. Think of the app shell as your development environment—it makes certain global features and variables available for you to work with, such as predefined HTML regions, global CSS variables, and a global `app` JavaScript object with methods for updating settings, accessing the database, etc. etc. A complete description of the HTML, CSS/SASS, and JavaScript features that are available is found in the [developer documentation][developers].

The Lotus app is also a [Progressive Web App][PWA] (PWA), meaning that it works offline and is installable as a native app on devices. Pull requests should adhere to the principles of PWAs.

## Directory Structure

The `/src` folder contains the following:

Folder        | Description
--------------|-------------------------------------------------------------------------------------------------------------------------------------------
`/app`        | The App is a special top-level component, globally accessible with the `app` variable. Also contains components specific to the app shell.
`/components` | Components that are shared across pages.
`/core`       | High-level JavaScript modules whose functionality is shared across components.
`/images`     | Images and icons used in the app.
`/sass`       | Global SASS variables and utility classes that are used across pages.
`/models`     | Data models (e.g. Language, Text, etc.).
`/pages`      | Each subfolder contains all the code for a single "page".
`/services`   | JavaScript modules which manage access to services like databases and APIs.
`/utilities`  | JavaScript utilities that are reused across components.
`/vendor`     | Third-party scripts. These are self-hosted alongside the app.

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

## Styleguides

JavaScript and CSS / SASS code should be linted before opening a pull request.

* JavaScript code is linted with [ESLint][ESLint]. The ESLint config file for this project is located at `.eslintrc.yml`.
* SASS / CSS code is linted with [Stylelint][Stylelint]. The Stylelint config file for this project is located at `.stylelintrc.yml`.

JavaScript code comments follow [JSDoc][JSDoc] conventions for describing code.

<!-- LINKS -->
[app-shell-model]: https://developers.google.com/web/fundamentals/architecture/app-shell
[Babel]:           https://babeljs.io/
[Cypress]:         https://www.cypress.io/
[developers]:      https://developer.digitallinguistics.io/app
[ESBuild]:         https://esbuild.github.io/
[ESLint]:          https://eslint.org/
[gh-contributing]: https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution
[JSDoc]:           https://jsdoc.app/
[new-issue]:       https://github.com/digitallinguistics/app/issues/new
[PWA]:             https://developers.google.com/web/updates/2015/12/getting-started-pwa
[Stylelint]:       https://stylelint.io/
