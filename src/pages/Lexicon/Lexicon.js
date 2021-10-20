import styles    from './Lexicon.less';
import template  from './Lexicon.hbs';
import View      from '../../core/View.js';
import WebWorker from '../../core/WebWorker.js';

export default class LexiconPage extends View {

  constructor(language, lexemes = []) {

    super({ styles, template });

    // The Lexicon page worker is a singleton.
    LexiconPage.worker ??= new WebWorker(`./pages/Lexicon/LexiconWorker.js`);

    this.language = language;
    this.lexemes  = lexemes;
    this.worker   = LexiconPage.worker;

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

  renderList() {

    this.list.innerHTML = ``;

    this.worker.stream(
      `renderList`,
      { language: this.language.cid },
      this.renderListItem.bind(this),
    );

  }

  renderListItem(lexeme) {
    if (lexeme.language !== this.language.cid) return;
    const li = document.createElement(`li`);
    li.textContent = lexeme.displayName;
    this.list.appendChild(li);
  }

}
