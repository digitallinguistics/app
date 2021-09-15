import compare      from '../../../utilities/compare.js';
import List         from '../../../components/List/List.js';
import View         from '../../../core/View.js';
import html2element from '../../../utilities/html2element.js';

export default class AdditionalNamesList extends View {

  constructor(names = []) {
    super();
    this.names = names;
  }

  addEventListeners() {}

  render() {

    this.sort();

    const listClass = `names-list`;
    this.template   = document.getElementById(`additional-names-list-template`);
    this.el         = this.cloneTemplate();
    this.el.view    = this;
    const oldList   = this.el.querySelector(`.${ listClass }`);
    const listView  = new List(this.names, { template: this.template });
    const newList   = listView.render();

    newList.classList.add(listClass);
    oldList.replaceWith(newList);
    if (!this.names.length) newList.style.border = `none`;
    this.addEventListeners();

    return this.el;

  }

  template({ language, name }) {
    return html2element(`<li>${ name } (${ language })</li>`);
  }

  sort() {
    this.names.sort((a, b) => compare(a.name, b.name));
  }

}
