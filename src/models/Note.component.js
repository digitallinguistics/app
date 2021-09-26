import Note from './Note.js';

describe(`Note`, function() {

  describe(`language`, function() {

    it(`defaults to "English"`, function() {
      const note = new Note;
      expect(note.language).to.equal(`English`);
    });

    it(`can be set by the user`, function() {
      const language = `French`;
      const note     = new Note({ language });
      expect(note.language).to.equal(language);
    });

  });

  describe(`noteType`, function() {

    it(`defaults to "general"`, function() {
      const note = new Note;
      expect(note.noteType).to.equal(`general`);
    });

    it(`can be set by the user`, function() {
      const noteType = `pragmatic`;
      const note     = new Note({ noteType });
      expect(note.noteType).to.equal(noteType);
    });

  });

  describe(`source`, function() {

    it(`defaults to an empty string`, function() {
      const note = new Note;
      expect(note.source).to.equal(``);
    });
    
    it(`can be set by the user`, function() {
      const source = `DWH`;
      const note   = new Note({ source });
      expect(note.source).to.equal(source);
    });

  });

  describe(`text`, function() {

    it(`defaults to an empty string`, function() {
      const note = new Note;
      expect(note.text).to.equal(``);
    });

    it(`can be set by the user`, function() {
      const text = `This is an interesting note.`;
      const note = new Note({ text });
      expect(note.text).to.equal(text);
    });
  
  });

  it(`type`, function() {
    const note = new Note;
    expect(note.type).to.equal(`Note`);
  });

});
