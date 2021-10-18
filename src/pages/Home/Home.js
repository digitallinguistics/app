import styles   from './Home.less';
import template from './Home.hbs';
import View     from '../../core/View.js';

export default class HomePage extends View {

  /**
   * Create a new Home page.
   */
  constructor() {
    super({ styles, template });
  }

  /**
   * Render the Home Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.loadStyles();
    this.cloneTemplate();
    if (window.installEvent) this.showInstallPrompt();
    return this.el;
  }

  showInstallPrompt() {
    this.el.querySelector(`#install-prompt`).hidden = false;
    this.el.querySelector(`#install-prompt button`).addEventListener(`click`, () => {
      window.installEvent.prompt();
    });
  }

}
