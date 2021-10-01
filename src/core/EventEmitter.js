/**
 * An EventEmitter class, for subscribing to events emitted by an object.
 * @memberof Core
 * @see [Understanding Event Emitters]{@link https://css-tricks.com/understanding-event-emitters/}
 */
export default class EventEmitter {

  /**
   * The events table for this EventEmitter.
   * @type {Map}
   */
  events = new Map;

  /**
   * Emit an event with data.
   * @async
   * @param   {String}  eventName the name of the event being emitted
   * @param   {*}       [data]    any data accompanying the event
   * @returns {Promise}
   */
  emit(eventName, data) {
    const listeners = this.events.get(eventName) ?? new Set;
    return Promise.all(Array.from(listeners).map(func => func(data)));
  }

  /**
   * Unsubscribe a function from an event.
   * @param  {String}   eventName the name of the event to unsubscribe from
   * @param  {Function} func      the function to unsubscribe from the event
   */
  off(eventName, func) {
    const listeners = this.events.get(eventName) ?? new Set;
    listeners.delete(func);
  }

  /**
   * Listen for an event to be emitted by this emitter.
   * @param   {String}   eventName the name of the event to listen for
   * @param   {Function} func      the function to call when the event is emitted
   * @returns {Function}           a function that can be called to remove the listener
   */
  on(eventName, func) {

    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set);
    }

    this.events.get(eventName).add(func);

    return () => this.off(eventName, func);

  }

  /**
   * Listen for an event to be emitted by this emitter, and only fire the callback function once.
   * @param   {String}   eventName the name of the event to listen for
   * @param   {Function} func      the function to call when the event is emitted
   * @returns {Function}           a function that can be called to remove the listener
   */
  once(eventName, func) {

    const wrappedFunc = data => {
      this.off(eventName, wrappedFunc);
      return func(data);
    };

    return this.on(eventName, wrappedFunc);

  }

  /**
   * Remove all event listeners.
   */
  stop() {
    this.events = new Map;
  }

}
