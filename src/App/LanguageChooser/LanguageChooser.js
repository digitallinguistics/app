import NavList  from '../../components/NavList/NavList.js';
import styles   from './LanguageChooser.less';
import template from './LanguageChooser.hbs';
import View     from '../../core/View.js';

export default class LanguageChooser extends View {

  constructor(languages) {
    super({ styles, template });
    this.languages = languages;
  }

  addEventListeners() {
    this.el.querySelector(`.js-lang-chooser__button`)
    .addEventListener(`click`, () => this.events.emit(`add`));
  }

  itemTemplate({ cid, name }) {
    return View.fromHTML(`<li class="txn" data-id='${ cid }'><a href=#>${ name.default }</a></li>`);
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    const navList = new NavList(this.languages, {
      template: this.itemTemplate,
    });

    const oldList = this.el.querySelector(`.js-lang-chooser__list`);
    const newList = navList.render();

    newList.classList.add(`js-lang-chooser__list`);
    oldList.view?.events.stop();
    navList.events.on(`change`, id => this.events.emit(`select`, id));
    oldList.replaceWith(newList);

    this.addEventListeners();

    return this.el;

  }

}
