import { v4 as createUUID } from '../../node_modules/uuid/dist/esm-browser/index.js';

/**
 * A light wrapper around a Web Worker that makes sending/receiving messages with the worker easier.
 * @memberof Core
 */
export default class WebWorker {

  /**
   * Create a new Web Worker
   * @param {String} url The URL of the worker's JavaScript file.
   */
  constructor(url) {
    this.worker         = new WebWorker(url);
    this.worker.onerror = console.error;
  }

  /**
   * Post a message to the web worker and await the response.
   * @param   {String}          operation The operation for the worker to perform.
   * @param   {*}               [data]    The data to pass to the worker to operate on.
   * @returns {Promise<Object>} Resolves to the result of the operation.
   */
  post(operation, data) {
    return new Promise((resolve, reject) => {

      const operationID = createUUID();

      const listener = ({ data: result }) => {
        if (result.operationID === operationID) {
          this.worker.removeEventListener(`message`, listener);
          if (result.error) reject(result.error);
          resolve(result.data);
        }
      };

      this.worker.addEventListener(`message`, listener);
      this.worker.postMessage({ data, operation, operationID });

    });
  }

  /**
   * Trigger a Web Worker operation and subscribe a callback to its stream of emitted events.
   * @param {String}     operation      The operation for the worker to perform.
   * @param {*|Function} dataOrCallback The data to pass to the worker to operate on, or the callback function to call if no data needs to be passed.
   * @param {Function}   [callback]
   */
  stream(operation, dataOrCallback, callback) {

    const cb   = typeof dataOrCallback === `function` ? dataOrCallback : callback;
    const data = typeof dataOrCallback === `function` ? undefined : dataOrCallback;

    const operationID = createUUID();

    const listener = ({ data: result }) => {
      if (result.operationID === operationID) {

        if (result.data) {
          cb(result.data);
        }

        if (result.done) {
          this.worker.removeEventListener(`message`, listener);
        }

      }
    };

    this.worker.addEventListener(`message`, listener);
    this.worker.postMessage({ data, operation, operationID });

  }

}
