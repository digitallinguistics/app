import View from '../../core/View.js';

export default class HelpMenu extends View {
  addEventListeners(){
    const el = document.getElementById(`help-menu`);
    app.shortcuts(el).bind(`esc`, () => {
      el.removeAttribute(`open`);
    }
)
  }

  initialize(){
    this.addEventListeners();
  }

}
