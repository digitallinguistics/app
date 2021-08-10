/**
 * An Event Emitter class
 * @memberof core
 * @instance
 */
export default class EventEmitter {

  /**
   * The events hash for this EventEmitter
   * @type {Object}
   */
  #events = new Map;

  /**
   * Emit an event with data
   * @param  {String}  eventName The name of the event being emitted
   * @param  {Any}     data      Data accompanying the event
   * @return {Promise}
   */
  emit(eventName, data) {
    const listeners = this.#events.get(eventName) ?? new Set;
    return Promise.all(Array.from(listeners).map(func => func(data)));
  }

  /**
   * Unsubscribe a function from an event
   * @param  {String}   eventName The name of the event to unsubscribe from
   * @param  {Function} function  The function to unsubscribe from the event
   */
  off(eventName, func) {
    const listeners = this.#events.get(eventName) ?? new Set;
    listeners.delete(func);
  }

  /**
   * Add an event listener to this emitter
   * @param  {String}   eventName The name of the event to subscribe to
   * @param  {Function} function  The function to trigger when the event is emitted
   * @return {Function}           Returns a function that can be called to remove the subscription
   */
  on(eventName, func) {

    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, new Set);
    }

    this.#events.get(eventName).add(func);

    return () => this.#events.get(eventName).delete(func);

  }

}