import css  from './Home.less';
import View from '../../core/View.js';

export default class HomePage extends View {

  css = css;

  /**
   * A reference to the Home page `<template>` tag.
   * @type {HTMLTemplateElement}
   */
  template;

  /**
   * Render the Home Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.template = document.getElementById(`home-template`);
    this.el       = this.cloneTemplate();
    this.el.view  = this;
    if (window.installEvent) this.showInstallPrompt();
    return this.el;
  }

  showInstallPrompt() {
    this.el.querySelector(`#install-prompt`).hidden = false;
    this.el.querySelector(`#install-prompt button`).addEventListener(`click`, () => {
      window.installEvent.prompt();
    });
  }

}
