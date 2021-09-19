import compare from '../../../utilities/compare.js';
import List    from '../../../components/List/List.js';
import View    from '../../../core/View.js';

export default class LanguagesNav extends View {

  constructor(languages) {
    super();
    this.languages = languages;
  }

  render(languageCID) {

    this.languages.sort((a, b) => compare(a.name.default, b.name.default));

    const listView = new List(this.languages, {
      classes:  [`languages-list`],
      name:     `language`,
      template: this.template,
    });

    this.el       = document.querySelector(`.languages-nav`);
    const oldList = this.el.querySelector(`.languages-list`);
    const newList = listView.render(languageCID);

    oldList.view?.events.stop();
    if (!this.languages.length) newList.style.border = `none`;
    oldList.replaceWith(newList);

    listView.events.on(`change`, cid => this.events.emit(`change`, cid));

    this.el.querySelector(`.add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));

    return this.el;

  }

  // NOTE: Must use assignment here to override `template` property on List class.
  template = ({ cid, name }) => {
    const li       = document.createElement(`li`);
    li.dataset.id  = cid;
    li.textContent = name.default;
    return li;
  }

}
