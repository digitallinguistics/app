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
    this.el.querySelector(`.js-add-note-button`).addEventListener(`click`, this.addNote.bind(this));
  }

  addNote() {
    this.notes.unshift(new Note);
    this.renderList();
  }

  itemTemplate(data, i) {
    const li   = document.createElement(`li`);
    const view = new NoteView(data, i);
    const el   = view.render();
    li.classList.add(`note-item`);
    li.appendChild(el);
    return li;
  }

  render() {

    this.el      = this.cloneTemplate();
    this.el.view = this;

    if (this.border) this.el.classList.add(`bordered`);

    if (this.headingLevel !== `h3`) {
      const oldHeading = this.el.querySelector(`.js-notes-list-heading`);
      const newHeading = View.fromHTML(`
        <${ this.headingLevel } class='notes-list-heading js-notes-list-heading'>
          Notes
        </${ this.headingLevel }>
      `);
      oldHeading.replaceWith(newHeading);
    }

    this.renderList();
    this.addEventListeners();
    
    return this.el;
  
  }

  renderList() {

    const listOptions = {
      classes:  [`notes`],
      name:     `note`,
      template: this.itemTemplate,
    };

    const listView = new List(this.notes, listOptions);
    const newList = listView.render();
    const oldList = this.el.querySelector(`.notes`);
    oldList.view?.events.stop();
    oldList.replaceWith(newList);

  }

}
