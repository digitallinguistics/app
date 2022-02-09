# Contributor Guidelines

🌟Thank you🌟 for contributing to the Lotus app! 🙏🏼

Consider [opening an issue][new-issue] for any of the following:

* questions
* bugs or problems
* feature requests

Want to contribute code to the Lotus app? Awesome! 🌟 Check out [GitHub's Open Source Guide][gh-contributing] on contributing to open source projects.

## Quick Links

* [View the complete developer documentation here.][developers]
* [View documentation for maintainers.][maintainers]

## Contents

<!-- TOC -->

- [Project Principles](#project-principles)
- [Setting up the Development Environment](#setting-up-the-development-environment)
- [Developer Tools](#developer-tools)
  - [nodemon](#nodemon)
  - [ESLint & Stylelint](#eslint--stylelint)
  - [Storybook](#storybook)
- [Organization](#organization)
  - [Project Structure](#project-structure)
  - [Directory Structure](#directory-structure)
  - [App Structure](#app-structure)
- [Components](#components)
  - [Types of Components](#types-of-components)
  - [Writing Components](#writing-components)
    - [HTML / Handlebars](#html--handlebars)
    - [CSS / LESS](#css--less)
    - [JavaScript](#javascript)
      - [Notes](#notes)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Testing the App](#testing-the-app)
  - [Types of Tests](#types-of-tests)
  - [Writing Tests](#writing-tests)
    - [Unit Tests](#unit-tests)
    - [Component Tests](#component-tests)
    - [End-to-End Tests (E2E)](#end-to-end-tests-e2e)
    - [Miscellaneous Notes on Testing](#miscellaneous-notes-on-testing)
- [Build Process](#build-process)
  - [Offline Functionality](#offline-functionality)
- [Resources](#resources)
  - [Images](#images)
  - [Accessibility](#accessibility)
  - [Inspiration](#inspiration)

<!-- /TOC -->

## Project Principles

This project is driven by the needs of documentary and descriptive linguists, and so its development should be sensitive to the following principles:

- **accessibility** (e.g. keyboard entry and manipulation, inclusive design, progressive enhancement)
- **broad applicability** (e.g. only features many linguists are expected to use; no project-specific features)
- **community-oriented** (e.g. accessible to community members, access controlled by community members)
- **data freedom** (e.g. import/export in various formats, data longevity)
- **ethics and data privacy** (e.g. autonyms, choice of where data are stored, user permissions, access rights)
- **fieldwork-oriented** (e.g. works offline, launches quickly)
- **linguistic diversity** (e.g. support RTL and LTR writing systems, choice of font, choice of lexical category)
- **open source** (e.g. free, easy to contribute, rely only on well-supported tools/libraries, well-documented)
- **scientific transparency** (e.g. ability to recreate data sets, faithfulness to original data, easily citable)

## Setting up the Development Environment

Follow these steps to set up your local development environment:

1. Install the latest Current version of [Node]. (If you need use multiple versions of Node on your machine, consider using [nvm] (unix, macOS, and windows WSL) or [nvm-windows] (windows)).

2. Clone the repository and `cd` into its folder:

    ```cmd
    > git clone https://github.com/digitallinguistics/app.git
    > cd app
    ```

    If you're unfamiliar with the git or the command line, you may want to install [GitHub Desktop][gh-desktop], an easy-to-use user interface for managing git repositories.

3. Install all the software dependencies for the project. This typically takes several minutes.

    ```cmd
    > npm install
    ```

4. Build the app. This processes all of the files in the `src/` directory and outputs the production-ready code in the `dist/` directory.

    ```cmd
    > npm run build
    ```

5. Start a local server which points to the production-ready files in `dist/`.

    ```cmd
    > npm start
    ```

6. View the working version of the app by opening a browser and navigating to https://localhost:3000.

## Developer Tools

This section describes several developer tools that are strongly recommended while making changes to the code.

### nodemon

Each time you make changes to the sources files, you will need to rebuild the app. You do not need to restart the server each time, but you will need to refresh the page in the browser for the changes to appear. [nodemon] is a simple tool that you can configure to automatically rebuild the app and restart the server each time a change is detected in your files.

### ESLint & Stylelint

[ESLint] and [Stylelint] are two tools that analyze or "lint" your code as you work to detect common problems and in many cases fix them automatically. They also help ensure that different developers structure their code in the same way.

ESLint lints JavaScript, while Stylelint lints CSS / LESS. The list of rules / problems that ESLint checks for are located in `.eslintrc.yml`. The list of rules / problems that Stylelint checks for are located in `.stylelintrc.yml`.

Most code editors have settings, plugins, or extensions that support ESLint and Stylelint. You should install these plugins / extensions so that your editor automatically reports issues found by ESLint and Stylelint.

### Storybook

[Storybook] is a tool for managing a library of components. It allows developers to create, style, and test each component in isolation, as well as in combination. Each component is given its own "story", and files containing story specifications end in `.stories.mdx`. When creating new components, it is recommended that you develop using Storybook first, and then write component tests using Cypress.

To use Storybook:

1. Start a local server (`npm start`).
2. Run the Storybook application (`npm run storybook`).
3. The Storybook interface will open, allowing you to explore each component and its variations.
4. Storybook automatically updates its interface when you make changes to either the stories or the component ("hot reloading"). You do not (usually) need to restart Storybook after each change, or even refresh the page.

The [Storybook documentation][Storybook] explains how to write stories for components.

## Organization

This section explains the organization of the project and the app code.

### Project Structure

| Folder            | Description                                                                                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/`        | Developer documentation.                                                                                                                                                                                                                                    |
| `.storybook/`     | Configuration for [Storybook].                                                                                                                                                                                                                              |
| `build/`          | Scripts to build the production version of the app from the `src/` files.                                                                                                                                                                                   |
| `dist/`**         | Production code for the app. The contents of this folder are deployed to the production server on release, and a staging server on pull requests.                                                                                                           |
| `docs/`**         | Developer documentation. The contents of this folder are deployed to https://developer.digitallinguistics/app.                                                                                                                                              |
| `node_modules/`** | JavaScript libraries that this project uses as dependencies. This folder is not checked into git.                                                                                                                                                           |
| `src/`            | Source code for the app. Test files should live alongside their source components. See [App Structure](#app-structure) below for details.                                                                                                                   |
| `test/`           | Configuration code and fixtures for tests. Test specs should _not_ be placed here unless they are tests having to do with the development environment. Test files belong next to the component they are testing. (See [Testing the App](#testing-the-app).) |

\** Not checked into git.

### `src/` Directory Structure

The `src/` folder contains the following:

| Folder              | Description                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `App/`              | The App is a special top-level component, globally accessible with the `app` variable. Also contains components that are specific to the app shell. |
| `classes/`          | CSS-only components that are shared across pages.                                                                                                   |
| `components/`       | Interactive components (that use JavaScript) that are shared across pages (but not part of the app shell).                                          |
| `core/`             | The app's JavaScript framework (a custom framework written in vanilla JavaScript).                                                                  |
| `fonts/`            | Font files.                                                                                                                                         |
| `images/`           | Images and icons used in the app.                                                                                                                   |
| `models/`           | Data models (e.g. Language, Text, etc.).                                                                                                            |
| `pages/`            | Each subfolder contains all the code for a single "page".                                                                                           |
| `services/`         | JavaScript modules which manage access to services like databases and APIs.                                                                         |
| `styles/`           | Global classes, variables, and utility classes that are used across pages.                                                                          |
| `utilities/`        | JavaScript utilities that are reused across components.                                                                                             |
| `index.hbs`         | The HTML shell for the app.                                                                                                                         |
| `index.less`        | Global styles that apply across the app.                                                                                                            |
| `manifest.json`     | Web app manifest for installing the site as a web app.                                                                                              |
| `offline‑worker.js` | A service worker which makes the app work offline.                                                                                                  |

### App Structure

The Lotus app follows a typical [app shell model][app-shell-model]. A lightweight HTML + CSS + JS skeleton with minimal content is delivered to the browser, and everything else is then loaded dynamically or lazy-loaded. Think of the app shell as your development environment—it makes certain global features and variables available for you to work with, such as predefined HTML regions, global CSS variables, and a global `app` object with methods for updating settings, accessing the database, etc. etc.

- **HTML:** Each section of the app's HTML shell is documented with inline comments in `src/index.hbs`. However, the areas where content can be rendered are as follows:

  ```html
  <body id=app>
    <header id=banner><!-- Main banner at top of page, with a few app-level controls and menus. Sticky positioning. -->
    <div id=wrapper><!-- Wrapper for laying out the main app sections. -->
      <nav id=nav><!-- Main navigation for the app. Collapsible. -->
      <main id=main><!-- Where main page content is rendered. -->
      <aside id=sidebar><!-- Sidebar for ancillary page components. Collapsible. NOTE: Not yet implemented. -->
    </div>
    <footer id=footer><!-- Status / information bar. Sticky positioning. NOTE: Not yet implemented. -->
  </body>
  ```

- **CSS / LESS:** Global styles and utilities are located in `src/styles/`. Styling for the app shell is located in `src/App/App.less`. Styles for individual components are located alongside their components, in `{ComponentName}.less`.

- **JavaScript:** Many single-page apps use a JavaScript framework such as Vue or React. The Lotus app uses its own simple, vanilla JavaScript framework instead, consisting of base `View`, `Model`, and `EventEmitter` classes, among others. In addition, all modules have access to the global `app` object.

  The documentation for the app's JavaScript framework is available at https://developer.digitallinguistics.io/app. It shows all the methods available on the global `App` object, as well as documents how to use other shared modules such as the `View` and `EventEmitter` classes.

The Lotus app is also a [Progressive Web App][PWA] (PWA), meaning that it works offline and is installable as a native app on devices. Pull requests should adhere to the principles of PWAs.

## Components

Each interactive section of the app is called a **component**. Components may contain other, smaller components. For example, the top-level `App` component contains a `LanguagesPage` component, the `LanguagesPage` component contains a `LanguageEditor` component, and the `LanguageEditor` component uses the `TranscriptionGroup` component.

Each component can have several types of files associated with it. Not all components will have all of these types of files. Many components consist of just a CSS class, and so consist of a single LESS file. Most components only need 1 type of test file as well.

- `.component.js`: Component tests for this component.
- `.e2e.js`: End-to-end tests for this component.
- `.hbs`: The HTML template for the component, written in [Handlebars].
- `.less`: The styling for the component, written in [LESS].
- `.js`: The JavaScript controller that manages this view's functionality.
- `.stories.mdx`: The code for rendering this component in Storybook.
- `.unit.js`: Unit tests for this component.

All of these files should be located together in the same directory. For example, the `NavList` directory looks like this:

```
NavList/
  - NavList.component.js
  - NavList.hbs
  - NavList.js
  - NavList.less
  - NavList.stories.mdx
```

### Types of Components

There are four types of components in the app:

* the top-level `App` component (`src/App/`)
* one component for each page (`src/pages/`), ex. `Languages`
* components that are specific to a certain page (`src/pages/{Page}/{ComponentName}/`), ex. `LanguageEditor`
* components that are shared across pages (`src/components/{ComponentName}/`), ex. `List`

### Writing Components

This section provides guidelines for writing components.

#### HTML / Handlebars

The HTML for each component is written in [Handlebars], an HTML templating language. This allows you to embed components within components using `{{> ComponentName }}`.

You can import Handlebars templates directly into your component's Javascript, and use the View to clone the template using the `cloneTemplate()` method. This method clones the template and sets it to the View's `el` property.

```js
import styles   from './View.less';
import template from './View.hbs';

class List extends View {

  constructor() {
    super({ styles, template });
  }

  render() {
    this.loadStyles();
    this.cloneTemplate(); // sets this.el
    /* other rendering code */
    this.addEventListeners();
    return this.el;
  }

}
```

#### CSS / LESS

The styles for each component are written in [LESS], an extension to CSS syntax which provides some useful additional features for developers. All valid CSS is also valid LESS.

[See the LESS documentation for more details on using LESS.][LESS]

The Lotus project partially uses [Block-Element-Modifier (BEM)][BEM] naming conventions for CSS, which typically looks like this:

```css
.block__element--modifier {
  /* styles here */
}
```

For the Lotus app, a "block" is a component, and an "element" is any element within that component. The Lotus app does *not* use the `--modifier` syntax however. Instead it uses a separate modifier class.

As an example, if you have a Languages Nav component which includes a green "Add a language" button and a red "Delete a language" button, your HTML and styles might look like this:

```html
<nav class=lang-nav>
  <ul class=lang-nav__list>
    <li class=lang-nav__item>Language A</li>
    <li class=lang-nav__item>Language B</li>
    <li class=lang-nav__item>Language C</li>
  </ul>
  <button class='btn green lang-nav__btn lang-nav__add-lang-btn'>Add a language</button>
  <button class='btn red lang-nav__btn lang-nav__delete-lang-btn'>Delete a language</button>
</nav>
```

```css
.btn {
  /* generic button styles */
}

.green {
  /* green button styles */
}

.red {
  /* red button styles */
}

.lang-nav {
  /* styles for the <nav> */
}

.lang-nav .lang-nav__list {
  /* styles for the list */
}

.lang-nav .lang-nav__item {
  /* styles for list items */
}

.lang-nav__btn {
  /* styles for the specific buttons inside the languages nav */
}

.lang-nav__add-lang-btn {
  /* styles specific to the Add a Language button */
}

.lang-nav__delete-lang-btn {
  /* styles specific to the Delete a Language button */
}
```

In LESS, this can be written much more tersely:

```less
.btn {
  &.red { /* styles */ }
  &.green { /* styles */ }
}

.lang-nav {
  &__list { /* styles */ }
  &__item { /* styles */ }
  &__btn { /* styles */ }
  &__add-lang-btn { /* styles */ }
  &__delete-lang-btn { /* styles */ }
}
```

**Where to import component styles**

* Global styles and declarations that apply across the app are located in `index.less`.

* Styling for the app shell is located in `App/App.less`.

* Styles for individual JavaScript components should be imported by their component, and then added to the page with the View's `loadStyles()` method, which adds a `<style>` tag to the page's `<head>` containing that component's styles.

  ```js
  import styles   from './View.less';
  import template from './View.hbs';

  class List extends View {

    constructor() {
      super({ styles, template });
    }

    render() {
      this.loadStyles();
      this.cloneTemplate();
      /* other rendering code */
      this.addEventListeners();
      return this.el;
    }

  }
  ```

* Styles for CSS-only components should be added to each page that uses that component. Component styles should *not* be added to the global styles in `index.less`. For example, the `LineInput` class is used by the Languages page and the Lexicon page, but not the Home page, so `Languages.less` and `Home.less` import `LineInput.less`, but `Home.less` does not.

#### JavaScript

Each component with functionality has a JavaScript *controller* which controls that functionality. The main tasks of the controller are to render the component, respond to user interactions with the component, and alert other components when certain events happen.

Each controller should be an instance of the `View` class (`src/core/View.js`). Each JavaScript file for a component should export a single view as its default export. For example, the `List` component looks like this:

```js
// List.js

import View from '../../core/View.js';

export default class List extends View { /* ... */ }
```

The `View` class has some utilities for controllers, and documents the conventions that should be followed by view instances. *Be sure to read the source code comments in `src/core/View.js`.*

Each view should have a `render()` method which creates the DOM element for that component. The `render()` method should do several things:

1. Load its styles (using `View.prototype.loadStyles()`).
2. Create an element from its template, if needed (using `View.prototype.cloneTemplate()`).
3. Attach event listeners (by adding an `addEventListeners()` method).
4. Return the new HTML element for the View.

##### Notes

- Components for entire pages must always return a `<main id=main class=main data-page={PageName}>` element.

- *Components should never insert themselves into the DOM.* This is the job of their parent controller. For example, the App component controls the Languages page component, and the Languages page component controls the LanguageEditor component. Each component is responsible for loading its immediate subcomponents.

- Controllers *should* add their own event listeners. This is usually done at the end of the `render()` method.

- Controllers *should* add their own CSS to the page. See [Writing Components > CSS / LESS](#css--less) above for details.

- Be sure to document your JavaScript code using [JSDoc][JSDoc] code comments.

Sometimes components will need to listen for events on other components. For example, clicking a button in one component might cause another component to update. To alert other components of an event, use `{view}.events.emit('{event name}', data)`. To subscribe to events on another component, use `{view}.events.on('{event name}', callbackFunction)`. When an event is emitted, the data for that event is passed to the callback function. Event listeners can be synchronous or asynchronous. See the source code for the `EventEmitter` class in `src/core/EventEmitter.js` for more details. Views should only listen for events on their children / subcomponents.

## Keyboard Shortcuts

The Lotus app supports keyboard shortcuts using the [Mousetrap] library. A Mousetrap instance is saved at `app.shortcuts`, allowing you to register / deregister keyboard shortcuts there. See the [Mousetrap documentation][Mousetrap] for complete details.

## Testing the App

The Lotus project includes a collection of tests that you can run to ensure that everything in the app is functioning correctly. Before you make a pull request, you should run the tests for the app to check that your changes did not break any existing functionality. (Instructions for how to run the tests are below.) If the tests fail, you should either fix the code or update the tests to reflect the new functionality.

Whenever possible, write a test for the changes you are making. This ensures that future changes will not break your code.

### Types of Tests

There are several types of tests in this project:

- **unit tests:** These tests cover small, isolated parts of the code such as individual classes, methods, or modules. These tests are run with [Mocha] and have a `.unit.js` extension.

- **component tests:** These tests check the functionality of individual components of the app in isolation, such as a nav, dropdown, etc. These tests are run with a combination of [Storybook] + [Cypress] and have a `.component.js` extension.

- **end-to-end (E2E) tests:** These tests imitate the behavior of the end user using the entire production-ready app to accomplish various tasks, and depend on databases, servers, etc. These typically only test the "happy path", rather than various errors. These tests are run with [Cypress] and have a `.e2e.js` extension.

- **performance tests:** These tests check the app's performance in terms of speed and other metrics. These tests are run with [Lighthouse].

**NOTE:** Both Mocha and Cypress use the [Chai] assertion framework to make assertions about expected behaviors.

The list of tests above is ordered from quickest / least computationally expensive to slowest / most computationally expensive.

```
fast / cheap <------------> slow / expensive

unit <--- component --- E2E ---> performance
```

Since tests on the lower end of this continuum are quick and easy to write and run, you should write as many of your tests on the unit testing end of the continuum as possible. This will create what is known as the "testing pyramid", with many tiny unit / component tests and a small number of E2E / performance tests.

Cypress tests can either be run programmatically (from the command line), or by using an interactive interface which allows you to watch the tests interact with the app, rerun, and debug those tests.

You can run the various types of tests with the following commands:

| Test Type   | Extension       | Interface    | Command (with `npm run`)          |
| ----------- | --------------- | ------------ | --------------------------------- |
| unit        | `.unit.js`      | interactive  | —                                 |
| unit        | `.unit.js`      | programmatic | `test:unit`                       |
| component   | `.component.js` | interactive  | `cypress-ct`                      |
| component   | `.component.js` | programmatic | `test:component`                  |
| E2E         | `.e2e.js`       | interactive  | `cypress-e2e`                     |
| E2E         | `.e2e.js`       | programmatic | `test:e2e`                        |
| performance | —               | interactive  | [Chromium dev tools][lh-devtools] |
| performance | —               | programmatic | `test:perf`                       |

You can also open Storybook + Cypress individually. First run `npm run storybook`, and then in a separate terminal run `npm run cypress-ct-open`. However, it is typically easier to just run one of the commands in the table above.

### Writing Tests

This section explains how to structure the different kinds of tests.

#### Unit Tests

Unit tests typically test pure JavaScript modules that don't require a browser to run. Each test within a unit test suite should work in isolation, independently of any of the other tests. You should even be able to run them out of order.

In this project, items that have unit tests are modules in `core/`, `models/`, or `utilities/`, plus a few tests of the development environment in `test/`.

To write a unit test, import the module you are testing as well as the [Chai] assertion library, then write tests for each of the properties / methods that the module exposes. Here is a small example:

```js
// EventEmitter.unit.js

import chai         from 'chai';
import EventEmitter from './EventEmitter.js'

const { expect } = chai;

describe(`EventEmitter`, function() {

  it(`has an events Map`, function() {
    const emitter = new EventEmitter;
    expect(emitter.events).to.be.a(Map);
  });

});
```

You may occasionally also want to import other testing utilities such as [Sinon] for stubs, mocks, and spies:

```js
// EventEmitter.unit.js

import chai         from 'chai';
import EventEmitter from './EventEmitter.js';
import sinon        from 'sinon';
import sinonChai    from 'sinon-chai';

chai.use(sinonChai);

const { expect } = chai;

describe(`EventEmitter`, function() {

  it(`emit`, async function() {

    const emitter = new EventEmitter;
    const stub    = sinon.stub();

    emitter.on(`test`, stub);
    await emitter.emit(`test`);

    expect(stub).to.have.been.calledOnce;

  });

});
```

**NOTE:** Some unit tests have to be run in the browser because they rely on specific browser APIs (for example, the tests for `Model.js`). These should be given the `.component.js` extension so that they run in the browser, but otherwise can be written as normal unit tests.

#### Component Tests

Component tests check the functionality of a single component in isolation. Any items in the `components/` folder that have functionality, or any page-specific components in `pages/{ComponentName}` that have functionality, should have a component test.

Component tests are run using [Cypress] tests on a single [Storybook] story. To load the component, call `cy.visit()` on the URL for that particular story. You can find the URL by opening that story in Storybook, clicking the "Open canvas in new tab" icon in the upper right (the external link icon), and copying the URL from that tab. Now you can write your component tests using Cypress' API. Note that you do *not* need to import Chai or Sinon—these are included in Cypress. Here is a small example test:

```js
// List.component.js

describe(`List`, function() {

  // load the Storybook story
  before(function() {
    cy.visit(`http://localhost:6006/iframe.html?id=components-list`);
  });

  // run tests on the component
  it(`renders`, function() {
    cy.get(`.list`)
    .children()
    .should(`have.lengthOf`, 3);
  });

});
```

#### End-to-End Tests (E2E)

End-to-end (E2E) tests are tests on the entire composed app that imitate how a user would interact with the app to perform various tasks. E2E tests should generally only test the "happy path" (that the required functionality works as expected); they should not test every possible error and edge case.

E2E tests do not use Storybook components. Instead they run directly on the app itself. E2E tests often involve long chains of commands, where the result of one test depends on the outcome of previous tests. [Read the Cypress docs about tiny tests for more information.](https://docs.cypress.io/guides/references/best-practices#Creating-tiny-tests-with-a-single-assertion)

To write an E2E test, first visit the app page using `cy.visit('/')`, and then use Cypress to interact with the app like a user would. For example, you could use `cy.get()` to look for text on a page rather than IDs or class names. See the `Languages.e2e.js` file for a good example of what this looks like.

#### Miscellaneous Notes on Testing

* Use "if/when ..., then ..." format whenever appropriate.

## Build Process

You can build the app, its tests, and all its documentation with `npm run build`. (Remember that you can also use [nodemon] to automatically rerun this command when files change.)

Running `npm run build` triggers a number of build steps. Many of these steps can also be run individually with the following commands. Build scripts are all located in `build/`.

- `npm run build:cache`: builds a list of assets to cache offline
- `npm run build:copy`: copies static assets to `dist/`
- `npm run build:docs`: builds the developer documentation
- `npm run build:js`: builds transpiled JS files
- `npm run build:stories`: builds assets required by Storybook

You can skip building the docs and Storybook stories by running `npm run quick-build`.

### Offline Functionality

The Lotus app is designed to be an offline web app. As such, all assets required to run the app must be available offline. This functionality is achieved via the `src/offline-worker.js` file. This file caches all the required assets for the app. It uses the file `dist/cache.json` to determine which files need to be cached. The `cache.json` file is generated during the build process (by `buildCache.js`) by creating a list of all files present in the `dist/` folder (except for `offline-worker.js` itself).

## Resources

This section contains various resources that may be useful during development.

### Images

The Lotus app uses [Feather Icons][Feather] for UI purposes by default. The app also has some more decorative icons that are less interactive. These are taken from [Flaticon][Flaticon]. Generally, UI icons should be black and white with rounded edges, while decorative icons should be colorful and flat with sharp edges.

### Accessibility

Some great resources on creating accessible components:

* [Inclusive Components](https://inclusive-components.design/)
* [A complete guide to accessible front-end components](https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/)
* [Developer Accessibility Guide](https://www.accessibility-developer-guide.com/)

### Inspiration

Other single-page apps or tools this project sometimes mimics:

* [FLEx]
* GitHub (web)
* GitHub (desktop)
* [Microsoft Todo][MSTodo] (web)
* [SayMore]
* Slack (desktop)
* Trello

Some older versions of styles for the app are located [here](https://github.com/digitallinguistics/styles/tree/8ec3d9f232e37080531a0b69fa542e66fb49721c).

<!-- LINKS -->
[app-shell-model]: https://developers.google.com/web/fundamentals/architecture/app-shell
[BEM]:             http://getbem.com/introduction/
[Chai]:            https://www.chaijs.com/
[Cypress]:         https://www.cypress.io/
[cypress-ct]:      https://docs.cypress.io/guides/component-testing/introduction
[developers]:      https://developer.digitallinguistics.io/app
[ESLint]:          https://eslint.org/
[Feather]:         https://feathericons.com/
[Flaticon]:        https://www.flaticon.com/
[FLEx]:            https://software.sil.org/fieldworks/
[gh-contributing]: https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution
[gh-desktop]:      https://desktop.github.com/
[Handlebars]:      https://handlebarsjs.com/
[JSDoc]:           https://jsdoc.app/
[LESS]:            https://lesscss.org/
[lh-devtools]:     https://developers.google.com/web/tools/lighthouse/#devtools
[Lighthouse]:      https://developers.google.com/web/tools/lighthouse/
[maintainers]:     https://github.com/digitallinguistics/app/blob/main/.github/MAINTAINERS.md
[Mandala]:         https://audio-video.shanti.virginia.edu/video/gurung-man-describes-otar-village
[Mocha]:           https://mochajs.org/
[Mousetrap]:       https://craig.is/killing/mice
[MSTodo]:          https://to-do.live.com/
[new-issue]:       https://github.com/digitallinguistics/app/issues/new
[Node]:            https://nodejs.org/en/
[nodemon]:         https://nodemon.io/
[nvm]:             https://github.com/nvm-sh/nvm
[nvm-windows]:     https://github.com/coreybutler/nvm-windows
[PWA]:             https://developers.google.com/web/updates/2015/12/getting-started-pwa
[SayMore]:         https://software.sil.org/saymore/
[Sinon]:           https://sinonjs.org/
[Storybook]:       https://storybook.js.org/
[Stylelint]:       https://stylelint.io/
[templates]:       https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
