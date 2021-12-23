import styles from './LexemesList.less';
import View   from '../../../core/View.js';

/**
 * A view providing a list of summary information about a list of lexemes.
 */
class LexemesList extends View {

  /**
   * Create a new Lexemes List.
   * @param {Array<Lexeme>} lexemes The set of lexemes to render. The list will render in the same order as provided.
   */
  constructor(lexemes = []) {
    super({ styles });
    this.el      = document.createElement(`ol`);
    this.lexemes = lexemes;
    this.el.classList.add(`lexemes-list`);
  }

  addEventListeners() {
    this.el.addEventListener(`click`, ev => {

      ev.preventDefault();

      const li         = ev.target.closest(`li`);
      const { lexeme } = li.dataset;

      if (lexeme) {
        this.setCurrentItem(lexeme);
        this.events.emit(`change`, lexeme);
      }

    });
  }

  /**
   * Render the Lexemes List.
   * @param {String} lexemeCID The CID of the lexeme to set as the current lexeme.
   */
  render(lexemeCID) {

    this.loadStyles();

    for (const lexeme of this.lexemes) {

      const li = document.createElement(`li`);

      li.dataset.lexeme = lexeme.cid;
      li.textContent    = lexeme.lemma.default;

      if (lexeme.cid === lexemeCID) {
        li.classList.add(`current`);
      }

      this.el.appendChild(li);

    }

    this.addEventListeners();

  }

  /**
   * Change the current Lexeme.
   * @param {String} cid The CID of the Lexeme to set as current.
   */
  setCurrentItem(cid) {

    const oldItem = this.el.querySelector(`.current`);

    if (oldItem) {
      oldItem.classList.remove(`current`);
      oldItem.removeAttribute(`aria-current`);
    }

    const newItem = this.el.querySelector(`[data-lexeme="${ cid }"]`);

    if (newItem) {
      newItem.classList.add(`current`);
      newItem.setAttribute(`aria-current`, `lexeme`);
    }

  }

}

export default LexemesList;
