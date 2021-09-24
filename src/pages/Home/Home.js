import View from '../../core/View.js';

export default class HomePage extends View {

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
    if (app.installEvent) this.showInstallPrompt();
    return this.el;
  }

  showInstallPrompt() {
    this.el.querySelector(`#install-prompt`).hidden = false;
    this.el.querySelector(`#install-prompt button`).addEventListener(`click`, () => {
      app.installEvent.prompt();
    });
  }

}
