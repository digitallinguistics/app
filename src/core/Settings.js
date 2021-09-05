/**
 * A class for the Settings object. Wraps Local Storage in a Proxy so that any changes to the Settings instance is automatically saved to Local Storage.
 */
export default class Settings {

  #defaults = {
    navOpen: true,
    page:    `Home`,
  }

  constructor(initialSettings = {}) {

    const settings = Object.assign(this.#defaults, initialSettings);

    return new Proxy(settings, {
      set(target, prop, val) {
        const ret = Reflect.set(target, prop, val);
        localStorage.setItem(`settings`, JSON.stringify(target));
        return ret;
      },
    });

  }

}
