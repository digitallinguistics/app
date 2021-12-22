import View from '../../core/View.js';

export default class HelpMenu extends View {

  constructor({ el } = {}) {
    super();
    this.el = el ?? document.querySelector(`.help-menu`);
  }

  addEventListeners() {
    if (this.el) { // this check is necessary because in Storybook there won't always be a Help Menu element
      app.shortcuts(this.el).bind(`esc`, () => {
        this.el.removeAttribute(`open`);
      });
    }
  }

  initialize() {
    this.addEventListeners();
  }


}
