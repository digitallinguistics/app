export default class LanguagesPage extends View {

  /**
   * Render the Languages Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.template = document.getElementById(`languages-page-template`);
    this.el       = this.template.content.cloneNode(true);
    return this.el;
  }

}
