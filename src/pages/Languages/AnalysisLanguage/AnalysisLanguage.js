import debounce  from '../../../utilities/debounce.js';
import styles    from './AnalysisLanguage.less';
import template  from './AnalysisLanguage.hbs';
import View      from '../../../core/View.js';

export default class AnalysisLanguage extends View {

  delay = 500;

  constructor(analysisLanguage = {}, index) {

    super({ styles, template });

    this.analysisLanguage = analysisLanguage;
    this.index            = index;
    this.langID           = `analysis-language-lang-${ index }`;
    this.abbrID           = `analysis-language-name-${ index }`;
    this.tagID            = `analysis-language-tag-${ index }`;

  }

  addEventListeners() {

    this.el.addEventListener(`click`, ({ target }) => {

      if (target.classList.contains(`js-analysis-language__cancel-button`)) {
        this.langInput.value = this.analysisLanguage.language;
        this.abbrInput.value = this.analysisLanguage.abbreviation;
        this.tagInput.value  = this.analysisLanguage.tag;
        this.updatePreview(
          this.analysisLanguage.language,
          this.analysisLanguage.abbreviation,
          this.analysisLanguage.tag,
        );
        return this.hideEditor();
      }

      if (target.classList.contains(`js-analysis-language__edit-button`)) {
        return this.showEditor();
      }

      if (target.classList.contains(`js-analysis-language__save-button`)) {

        if (this.tagInput.checkValidity()) {
          this.tagInput.disabled = true;
          this.save();
          this.updatePreview(
            this.analysisLanguage.language,
            this.analysisLanguage.abbreviation,
            this.analysisLanguage.tag,
          );

          return this.hideEditor();
        }

        this.tagInput.reportValidity();

      }

    });

    this.el.addEventListener(`input`, () => this.updatePreview(
      this.langInput.value,
      this.abbrInput.value,
      this.tagInput.value,
    ));

    this.el.addEventListener(`input`, debounce(ev => {
      if (ev.target.id === this.tagID) {
        this.abbrInput.value ||= ev.target.value;
      }
    }, this.delay));
  }

  hideEditor() {
    this.el.classList.remove(`editing`);
  }

  render() {

    this.loadStyles();
    this.cloneTemplate();

    this.el.dataset.id = this.index;
    this.editButton    = this.el.querySelector(`.js-analysis-language__edit-button`);
    this.editor        = this.el.querySelector(`.js-analysis-language__editor`);
    this.langInput     = this.el.querySelector(`.js-analysis-language__lang-input`);
    this.abbrInput     = this.el.querySelector(`.js-analysis-language__abbr-input`);
    this.tagInput      = this.el.querySelector(`.js-analysis-language__tag-input`);

    this.langInput.id    = this.langID;
    this.langInput.value = this.analysisLanguage.language;
    this.abbrInput.id    = this.abbrID;
    this.abbrInput.value = this.analysisLanguage.abbreviation;
    this.tagInput.id     = this.tagID;
    this.tagInput.value  = this.analysisLanguage.tag;

    if (this.tagInput.value) this.tagInput.disabled = true;

    this.el.querySelector(`.js-analysis-language__lang-legend`).setAttribute(`for`, this.langID);
    this.el.querySelector(`.js-analysis-language__abbr-legend`).setAttribute(`for`, this.abbrID);
    this.el.querySelector(`.js-analysis-language__tag-legend`).setAttribute(`for`, this.tagID);

    this.updatePreview(
      this.analysisLanguage.language,
      this.analysisLanguage.abbreviation,
      this.analysisLanguage.tag,
    );
    this.addEventListeners();

    return this.el;

  }

  save() {
    this.analysisLanguage.language     = this.langInput.value;
    this.analysisLanguage.abbreviation = this.abbrInput.value || this.tagInput.value;
    this.analysisLanguage.tag          = this.tagInput.value;
  }

  showEditor() {
    this.el.classList.add(`editing`);
    this.langInput.focus();
  }

  updatePreview(lang, abbr, tag) {
    this.el.querySelector(`.js-analysis-language__preview`)
    .innerHTML = `<span>${ lang }</span> <span class='analysis-language code'>${ abbr }</span>
      <span class='analysis-language code'>${ tag }</span>`;
  }

}
