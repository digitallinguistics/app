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
    this.el.querySelector(`.js-cancel-button`).addEventListener(`click`, () => {
      this.updatePreview();
      this.hideEditor();
    });
    this.el.querySelector(`.js-edit-button`).addEventListener(`click`, this.showEditor.bind(this));
    this.el.querySelector(`.js-save-button`).addEventListener(`click`, () => {
      this.save();
      this.updatePreview();
      this.hideEditor();
    });
    this.el.querySelector(`.js-text-preview`).addEventListener(`click`, this.showEditor.bind(this));
  }

  hideEditor() {
    this.el.classList.remove(`editing`);
  }

  render() {

    this.el        = this.cloneTemplate();
    this.el.view   = this;
    this.textInput = this.el.querySelector(`.js-text-input`);
    this.srcInput  = this.el.querySelector(`.js-src-input`);

    this.updatePreview();
    this.hydrate();
    this.addEventListeners();

    return this.el;
  
  }

  save() {
    this.note.dateModified = new Date;
    this.note.text         = this.textInput.value;
    this.note.source       = this.srcInput.value;
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
    this.el.querySelector(`.js-date-created`).textContent  = dateCreated;
    this.el.querySelector(`.js-date-modified`).textContent = dateModified;
    this.el.querySelector(`.js-src-preview`).textContent   = this.note.source;
    this.el.querySelector(`.js-text-preview`).innerHTML    = this.note.text || `<i style='font-style: italic;'>(no text)</i>`;
  
    // editor
    this.srcInput.value  = this.note.source;
    this.textInput.value = this.note.text;

  }

}
