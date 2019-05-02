/* eslint-disable no-underscore-dangle */

/**
 * Winston Transport for logging to the DataDog Agent using UDP
 * @module datadog-transport
 * @exports datadogTransport
 * @requires module:winston-transport
 * @requires module:dgram
 */

const Transport = require('winston-transport');
const dgram = require('dgram');

/**
 * Transport for DataDog logging via UDP and the DataDog Agent
 * @type {DatadogTransport}
 * @extends {Transport}
 */
module.exports = class DatadogTransport extends Transport {
  /**
   * Constructor
   * @param {!object} options        - Options
   * @param {sting} options.name    - Name for the transport
   * @param {string} options.host   - The datadog agent host to send logs to
   * @param {string} options.port   - The UDP port to send datadog logs to
   * @param {object[]} options.tags - tags to be added to all logged messages
   * @param {string} options.tags[].name  - tag name
   * @param {string} options.tags[].value - tag value
   * @returns {undefined}
   */  
  constructor(options = {}) {
    super(options);

    this.name = options.name || 'datadog-udp';
    this.host = options.host || 'localhost';
    this.port = options.port || 10518;
  }

  /**
   * Core logging method exposed to Winston
   * @param {object} msg 
   * @param {function} callback 
   */
  log(msg, callback) {
    const message = Buffer.from(msg.message);
    const client = dgram.createSocket('udp4');

    client.send(message, 0, message.length, this.port, this.host, (err) => {
        //istanbul ignore next
        if (err) {
        throw err;
      }
      client.close();

      if(callback)
        callback();
    });
  }
};
