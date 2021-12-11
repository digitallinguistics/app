import styles   from './Note.less';
import template from './Note.hbs';
import View     from '../../core/View.js';

export default class NoteView extends View {

  constructor(note, index) {
    super({ styles, template });
    this.note     = note;
    this.sourceID = `note-source-${ index }`;
    this.textID   = `note-text-${ index }`;
  }

  addEventListeners() {
    this.el.querySelector(`.js-note__cancel-button`).addEventListener(`click`, () => {
      this.updatePreview();
      this.hideEditor();
    });
    this.el.querySelector(`.js-note__edit-button`).addEventListener(`click`, this.showEditor.bind(this));
    this.el.querySelector(`.js-note__save-button`).addEventListener(`click`, () => {
      this.save();
      this.updatePreview();
      this.hideEditor();
    });
    this.el.querySelector(`.js-note__text-preview`).addEventListener(`click`, this.showEditor.bind(this));
  }

  hideEditor() {
    this.el.classList.remove(`editing`);
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    this.textInput = this.el.querySelector(`.js-note__text-input`);
    this.srcInput  = this.el.querySelector(`.js-note__src-input`);

    this.textInput.setAttribute(`id`, this.textID);
    this.srcInput.setAttribute(`id`, this.sourceID);
    this.el.querySelector(`.js-note__text-legend`).setAttribute(`for`, this.textID);
    this.el.querySelector(`.js-note__src-legend`).setAttribute(`for`, this.sourceID);

    this.updatePreview();
    this.addEventListeners();

    return this.el;

  }

  save() {
    this.note.dateModified = new Date;
    this.note.text         = this.textInput.value.cleanWhitespace();
    this.note.source       = this.srcInput.value.cleanWhitespace();
  }

  showEditor() {
    this.el.classList.add(`editing`);
    this.textInput.focus();
  }

  updatePreview() {

    const dateCreated = this.note.dateCreated.toLocaleDateString(undefined, {
      dateStyle: `short`,
    });

    const dateModified = this.note.dateModified.toLocaleDateString(undefined, {
      dateStyle: `short`,
    });

    // preview
    this.el.querySelector(`.js-note__date-created`).textContent  = dateCreated;
    this.el.querySelector(`.js-note__date-modified`).textContent = dateModified;
    this.el.querySelector(`.js-note__src-preview`).textContent   = this.note.source;
    this.el.querySelector(`.js-note__text-preview`).innerHTML    = this.note.text || `<i style='font-style: italic;'>(no text)</i>`;

    // editor
    this.srcInput.value  = this.note.source;
    this.textInput.value = this.note.text;

  }

}
