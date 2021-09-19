import View from '../../../core/View.js';

export default class AdditionalName extends View {

  template = document.getElementById(`additional-name-template`);

  constructor({ language, name }, index) {

    super();

    this.index    = index;
    this.language = language;
    this.name     = name;

    this.langID = `additional-name-lang-${ index }`;
    this.nameID = `additional-name-name-${ index }`;

  }

  render() {

    this.el            = this.cloneTemplate();
    this.el.view       = this;
    this.el.dataset.id = this.index;

    this.el.querySelector(`.js-preview`)
    .innerHTML = `<span class=txn>${ this.name }</span> (${ this.language })`;

    this.hydrate();

    return this.el;

  }

}
