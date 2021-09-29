import './NotesList.css';
import Note      from '../../models/Note.js';
import NotesList from "./NotesList";

export default {
  title: `Components/Notes List`,
};

const data = [{ text: `Note A` }, { text: `Note B` }, { text: `Note C` }]
.map(item => new Note(item));

const Template = ({ border, expanded, headingLevel, notes }) => {
  const list = new NotesList(notes, { border, headingLevel });
  const el   = list.render();
  el.style.width = `30em`;
  if (expanded) el.classList.add(`expanded`);
  return el;
};

export const Collapsed    = Template.bind({}); // also Populated, Border
export const Border       = Template.bind({}); // also Populated, Expanded
export const NoBorder     = Template.bind({}); // also Populated, Expanded
export const Empty        = Template.bind({}); // also Border,    Expanded
export const HeadingLevel = Template.bind({}); // also Populated, Expanded

Border.args = {
  expanded: true,
  notes:    data,
};

Collapsed.args = {
  notes: data,
};

Empty.args = {
  expanded: true,
};

HeadingLevel.args = {
  expanded:     true,
  headingLevel: `h2`,
  notes:        data,
};

NoBorder.args = {
  expanded: true,
  border:   false,
  notes:    data,
};


