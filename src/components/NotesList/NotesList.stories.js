import './NotesList.css';
import Note      from '../../models/Note.js';
import NotesList from "./NotesList";

export default {
  title: `Components/Notes List`,
};

const data = [{}, {}, {}]
.map(item => new Note(item));

const Template = ({ border, notes, headingLevel }) => {
  const list = new NotesList(notes, { border, headingLevel });
  return list.render();
};

export const Border       = Template.bind({}); // also Populated
export const NoBorder     = Template.bind({}); // also Populated
export const Empty        = Template.bind({}); // also Border
export const HeadingLevel = Template.bind({}); // also Populated

// TODO: Expanded vs. Collapsed (both populated, with borders)

Border.args = {
  notes: data,
};

NoBorder.args = {
  border: false,
  notes:  data,
};

HeadingLevel.args = {
  headingLevel: `h2`,
  notes:        data,
};
