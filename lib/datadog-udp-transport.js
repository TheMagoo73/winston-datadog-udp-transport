/* eslint-disable no-underscore-dangle */

/**
 * Winston Transport for logging to the DataDog Agent using UDP
 * @module datadog-transport
 * @exports datadogTransport
 * @requires module:winston-transport
 * @requires module:dgram
 */

const transport = require('winston-transport');
const dgram = require('dgram');

module.exports = class DatadogTransport extends transport {
  /**
   * Constructor
   * @param {object} options       - Options
   * @param {sting} options.name   - Name for the transport
   * @param {string} options.host  - The datadog agent host to send logs to
   * @param {string} options.port  - The UDP port to send datadog logs to
   */  
  constructor(options) {
    super(options);

    this.name = options.name || 'datadog-udp';
    this.host = options.host || 'localhost';
    this.port = options.port || 10518;
  }

  log(msg, callback) {
    const message = Buffer.from(msg);
    const client = dgram.createSocket('udp4');

    client.send(message, 0, message.length, this.port, this.host, (err) => {
        //istanbul ignore next
        if (err) {
        throw err;
      }
      client.close();
      callback();
    });
  }
};
