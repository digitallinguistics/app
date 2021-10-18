import compare  from '../../../utilities/compare.js';
import NavList  from '../../../components/NavList/NavList.js';
import styles   from './LanguagesNav.less';
import template from './LanguagesNav.hbs';
import View     from '../../../core/View.js';

export default class LanguagesNav extends View {

  constructor(languages) {
    super({ styles, template });
    this.languages = languages;
  }

  render(languageCID) {

    this.loadStyles();
    this.cloneTemplate();

    this.languages.sort((a, b) => compare(a.name.default, b.name.default));

    const listView = new NavList(this.languages, {
      classes:  [`list`, `languages-list`],
      name:     `language`,
      template: this.itemTemplate,
    });

    const oldList = this.el.querySelector(`.languages-list`);
    const newList = listView.render(languageCID);

    oldList.view?.events.stop();
    if (!this.languages.length) newList.style.border = `none`;
    oldList.replaceWith(newList);

    listView.events.on(`change`, cid => {
      app.settings.language = cid;
      this.events.emit(`change`, cid);
    });

    this.el.querySelector(`.js-languages-nav__add-language-button`)
    .addEventListener(`click`, () => this.events.emit(`add`));

    return this.el;

  }

  // NOTE: Must use assignment here to override `template` property on List class.
  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li class="txn" data-id='${ cid }'><a href=#language-editor>${ name.default }</a></li>`);
  }

}
