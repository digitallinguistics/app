import Note     from '../../models/Note.js';
import NoteView from './Note.js';

const data = {
  dateCreated:  `2021-01-01`,
  dateModified: `2021-01-01`,
  language:     `English`,
  source:       `DWH`,
  text:         `Velit tempor anim nulla nulla velit dolore aliqua cillum. Cillum dolor ea veniam aliqua excepteur aliquip nisi enim deserunt ipsum duis amet excepteur. Do veniam ipsum irure esse aliquip laborum enim aliqua voluptate incididunt magna enim ex do. Do enim fugiat in reprehenderit esse cillum voluptate consequat.`,
};

export default {
  title: `Components/Note`,
};

export const Blank = () => {
  const view = new NoteView(new Note, 0);
  const el   = view.render();
  return el;
};

export const Populated = () => {
  const view = new NoteView(new Note(data), 1);
  const el   = view.render();
  return el;
};
