import List     from '../../components/List/List.js';
import Note     from '../../models/Note.js';
import NoteView from '../Note/Note.js';
import View     from '../../core/View.js';

export default class NotesList extends View {

  template = document.getElementById(`notes-list-template`);

  constructor(
    notes = [],
    {
      border       = true,
      headingLevel = `h3`,
    } = {},
  ) {
    super();
    this.border       = border;
    this.headingLevel = headingLevel;
    this.notes        = notes;
  }

  addEventListeners() {
    this.el.addEventListener(`click`, ev => {
      
      const { currentTarget, target } = ev;

      if (target.classList.contains(`js-notes-list__add-note-button`)) { 
        this.addNote(); 
      }
      
      if (target.classList.contains(`js-note__delete-button`)) {
        const confirmed = confirm(`Are you sure you want to delete this note? This action cannot be undone.`);
        if (!confirmed) return;
        const id = target.closest(`.js-notes-list__note-item`)?.dataset?.id;
        if (!id) return; // ID is still a string here
        this.deleteNote(Number(id));
      }

      if (target.classList.contains(`js-note__save-button`)) {
        this.save();
      }

    });
  }

  addNote() {
    this.notes.unshift(new Note);
    this.updateHeading();
    this.renderList();
    this.save();
    const noteView = this.el.querySelector(`.js-notes-list__notes .js-notes-list__note-item:first-child .note`).view;
    noteView.showEditor();
  }

  deleteNote(i) {
    this.notes.splice(i, 1);
    this.updateHeading();
    this.renderList();
    this.save();
  }

  save() {
    this.events.emit(`update`);
  }

  itemTemplate(data, i) {

    const li = View.fromHTML(`<li class='js-notes-list__note-item notes-list__note-item' data-id='${ i }'></li>`);
    
    const button = View.fromHTML(`<button
      aria-label='Show note'
      class='button js-notes-list__note-button notes-list__note-button transparent'
      data-id='${ i }'
      type=button
    >
      <svg><use href=#sticky-note></svg>
    </button>`);

    const view = new NoteView(data, i);
    const el   = view.render();
    
    li.appendChild(button);
    li.appendChild(el);
    
    return li;
  
  }

  render() {

    this.el      = this.cloneTemplate();
    this.el.view = this;

    if (this.border) this.el.classList.add(`bordered`);

    this.updateHeading();
    this.renderList();
    this.addEventListeners();
    
    return this.el;
  
  }

  renderList() {

    const listOptions = {
      classes:  [`js-notes-list__notes`, `notes-list__notes`],
      name:     `note`,
      template: this.itemTemplate,
    };

    const listView = new List(this.notes, listOptions);
    const newList = listView.render();
    const oldList = this.el.querySelector(`.js-notes-list__notes`);
    oldList.view?.events.stop();
    oldList.replaceWith(newList);

  }

  updateHeading() {
    if (this.headingLevel === `h3`) {
      const heading = this.el.querySelector(`.js-notes-list__heading`);
      heading.textContent = `Notes (${ this.notes.length })`;
    } else {
      const oldHeading = this.el.querySelector(`.js-notes-list__heading`);
      const newHeading = View.fromHTML(`
        <${ this.headingLevel } class='notes-list__heading js-notes-list__heading'>
          Notes (${ this.notes.length })
        </${ this.headingLevel }>
      `);
      oldHeading.replaceWith(newHeading);
    }
  }

}
