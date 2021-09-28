import View from '../../core/View.js';

export default class NoteView extends View {

  template = document.getElementById(`note-template`);
  
  constructor(note, index) {
    super();
    this.note     = note;
    this.sourceID = `note-source-${ index }`;
    this.textID   = `note-text-${ index }`;
  }

  addEventListeners() {
    this.el.querySelector(`.js-cancel-button`).addEventListener(`click`, this.hideEditor.bind(this));
    this.el.querySelector(`.js-edit-button`).addEventListener(`click`, this.showEditor.bind(this));
    this.el.querySelector(`.js-save-button`).addEventListener(`click`, this.hideEditor.bind(this));
  }

  hideEditor() {
    this.el.classList.remove(`editing`);
  }

  render() {

    this.el      = this.cloneTemplate();
    this.el.view = this;

    this.updatePreview();
    this.hydrate();
    this.addEventListeners();

    return this.el;
  
  }

  showEditor() {
    this.el.classList.add(`editing`);
    this.el.querySelector(`.js-text-input`).focus();
  }

  updatePreview() {

    const dateCreated = this.note.dateCreated.toLocaleDateString(undefined, {
      dateStyle: `short`,
    });

    const dateModified = this.note.dateModified.toLocaleDateString(undefined, {
      dateStyle: `short`,
    });

    // preview
    this.el.querySelector(`.date-created`).textContent  = dateCreated;
    this.el.querySelector(`.date-modified`).textContent = dateModified;
    this.el.querySelector(`.src-preview`).textContent   = this.note.source;
    this.el.querySelector(`.text-preview`).textContent  = this.note.text;
  
    // editor
    this.el.querySelector(`.src-input`).value  = this.note.source;
    this.el.querySelector(`.text-input`).value = this.note.text;

  }

}
