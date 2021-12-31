import View from '../../core/View.js';

export default class HelpMenu extends View {

  constructor({ el } = {}) {
    super();
    this.el = el ?? document.getElementById(`help-menu`);
  }

  addEventListeners() {
    if (window.app) { // this check is necessary for Storybook
      app.shortcuts(this.el).bind(`esc`, () => {
        this.el.removeAttribute(`open`);
      });
    }
  }

  initialize() {
    this.addEventListeners();
  }

}
