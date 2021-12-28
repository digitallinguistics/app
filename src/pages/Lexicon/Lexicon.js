import LexemesList from './LexemesList/LexemesList.js';
import styles      from './Lexicon.less';
import template    from './Lexicon.hbs';
import View        from '../../core/View.js';

export default class LexiconPage extends View {

  constructor(language) {
    super({ styles, template });
    this.language = language;
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    this.el.dataset.language = this.language.cid;
    this.el.querySelector(`.js-lexicon__title`).textContent = this.language.name.default;

    const query       = IDBKeyRange.only(this.language.cid);
    const lexemes     = await app.db.lexemes.getAll({ index: `lemma`, query });
    const lexemesList = new LexemesList;

    lexemesList.el = this.el.querySelector(`.js-lexicon__lexemes-list`);

    return this.el;

  }

}
