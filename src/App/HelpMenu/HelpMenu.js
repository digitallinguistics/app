import View from '../../core/View.js';

export default class HelpMenu extends View {

  constructor({ el = document.querySelector(`.help-menu`) } = {}) {
    super();
    this.el = el;
  }

  addEventListeners() {
    app.shortcuts(this.el).bind(`esc`, () => {
      this.el.removeAttribute(`open`);
    });
  }

  initialize() {
    this.addEventListeners();
  }


}
