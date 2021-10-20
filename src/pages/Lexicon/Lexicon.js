import styles   from './Lexicon.less';
import template from './Lexicon.hbs';
import View     from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language, lexemes = []) {
    super({ styles, template });
    this.language = language;
    this.lexemes  = lexemes;
  }

  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li class="txn" data-id='${ cid }'><a href=#>${ name.default }</a></li>`);
  }

  render() {
    this.loadStyles();
    this.cloneTemplate();
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;
    this.list = this.el.querySelector(`.js-lexicon__lexemes-list`);
    this.renderList();
    return this.el;
  }

  async renderList() {

    // don't render if the database isn't initialized
    // (primarily relevant for testing)
    if (!app?.db) return;

    this.list.innerHTML = ``;

    this.lexemes.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: `base` }));

    Promise.all(this.lexemes.map(this.renderListItem.bind(this)));

    // for (const lexeme of this.lexemes) {
    //   this.renderListItem(lexeme);
    // }

  }

  async renderListItem(lexeme) {
    const li = document.createElement(`li`);
    li.textContent = lexeme.displayName;
    this.list.appendChild(li);
  }

}
