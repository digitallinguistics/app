import Model from '../core/Model.js';

export default class Note extends Model {

  constructor(data = {}) {

    super(data, { type: `Note` });

    this.language ??= `English`;
    this.noteType ??= `general`;
    this.source   ??= ``;
    this.text     ??= ``;
  
  }

}
