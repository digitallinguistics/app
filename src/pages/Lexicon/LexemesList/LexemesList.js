import View from '../../../core/View.js';

/**
 * A view providing a list of summary information about a list of lexemes.
 */
class LexemesList extends View {

  /**
   * Create a new Lexemes List.
   * @param {Array<Lexeme>} lexemes The set of lexemes to render. The list will render in the same order as provided.
   */
  constructor(lexemes = []) {
    super();
    this.el      = document.createElement(`ol`);
    this.lexemes = lexemes;
  }

  /**
   * Render the Lexemes List.
   */
  render() {
    for (const lexeme of this.lexemes) {
      const li = document.createElement(`li`);
      li.textContent = lexeme.lemma.default;
      this.el.appendChild(li);
    }
  }

}

export default LexemesList;
