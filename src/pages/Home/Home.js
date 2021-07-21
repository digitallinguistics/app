import View from '../../core/View.js';

export default class HomePage extends View {

  /**
   * Render the Home Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.template = document.getElementById(`home-page-template`);
    this.el       = this.template.content.cloneNode(true);
    return this.el;
  }

}
