import LexemesList from './LexemesList/LexemesList.js';
import styles      from './Lexicon.less';
import template    from './Lexicon.hbs';
import View        from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language, lexemes) {
    super({ styles, template });
    this.language = language;
    this.lexemes  = lexemes;
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    this.el.dataset.language = this.language.cid;
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;

    this.renderList(); // starts async rendering of list

    return this.el;

  }

  renderList() {
    const lexemesList = new LexemesList(this.lexemes);
    lexemesList.el = this.el.querySelector(`.js-lexicon__lexemes-list`);
    lexemesList.render();
  }

}
