import compare from '../../../utilities/compare.js';
import NavList from '../../../components/NavList/NavList.js';
import View    from '../../../core/View.js';

export default class LanguagesNav extends View {

  template = document.getElementById(`languages-nav-template`);

  constructor(languages) {
    super();
    this.languages = languages;
  }

  render(languageCID) {

    this.languages.sort((a, b) => compare(a.name.default, b.name.default));

    const listView = new NavList(this.languages, {
      classes:  [`languages-list`],
      name:     `language`,
      template: this.itemTemplate,
    });

    this.el       = this.cloneTemplate();
    this.el.view  = this;
    const oldList = this.el.querySelector(`.languages-list`);
    const newList = listView.render(languageCID);

    oldList.view?.events.stop();
    if (!this.languages.length) newList.style.border = `none`;
    oldList.replaceWith(newList);

    listView.events.on(`change`, cid => {
      app.settings.language = cid;
      this.events.emit(`change`, cid);
    });

    this.el.querySelector(`.add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));

    return this.el;

  }

  // NOTE: Must use assignment here to override `template` property on List class.
  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li data-id='${ cid }'><a href=#language-editor>${ name.default }</a></li>`);
  }

}
