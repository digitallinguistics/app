/**
 * A class for the Settings object. Wraps Local Storage in a Proxy so that any changes to the Settings instance are automatically saved to Local Storage.
 * @memberof Services
 */
class Settings {

  /**
   * The default settings for the app.
   * @name Settings~defaults
   * @type {Object}
   * @prop {Boolean} navOpen - Whether the main nav is open.
   * @prop {String}  page    - The last visited page.
   */
  #defaults = {
    navOpen: true,
    page:    `home`,
  };

  /**
   *
   * @param {Object}  [initialSettings={}]           The settings to instantiate the app with.
   * @param {Boolean} [initialSettings.navOpen=true] Whether the main nav is open.
   * @param {String}  [initialSettings.page=`home`]  The last visited page.
   * @returns {Proxy<Object>}
   */
  /* eslint-disable no-constructor-return */
  constructor(initialSettings = {}) {

    const settings = Object.assign({}, this.#defaults, initialSettings);

    return new Proxy(settings, {
      set(target, prop, val) {
        const ret = Reflect.set(target, prop, val);
        localStorage.setItem(`settings`, JSON.stringify(target));
        return ret;
      },
    });

  }

}

export default Settings;
