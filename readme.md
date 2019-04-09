[![CircleCI](https://circleci.com/gh/TheMagoo73/winston-datadog-udp-transport.svg?style=svg)](https://circleci.com/gh/TheMagoo73/winston-datadog-udp-transport)  [![codecov](https://codecov.io/gh/TheMagoo73/winston-datadog-udp-transport/branch/master/graph/badge.svg)](https://codecov.io/gh/TheMagoo73/winston-datadog-udp-transport)  [![Maintainability](https://api.codeclimate.com/v1/badges/54302646e6a4c0a66eca/maintainability)](https://codeclimate.com/github/TheMagoo73/winston-datadog-udp-transport/maintainability)  ![npm](https://img.shields.io/npm/v/winston-datadog-udp-transport.svg)

# winston-datadog-udp-transport
### Simple logging using UDP and the DataDog agent

The DataDog agent can be configured to accept logging via a UDP port, and then forward it to DataDog for ingestion. This Winston compatibe transport provides a very simple mechanism to make use of this feature. For more information on configuring the DataDog agent to accept UDP traffic, see [this arcticle](https://docs.datadoghq.com/logs/log_collection/?tab=streamlogsfromtcpudp#stream-logs-through-tcp-udp)

## Installation

```
npm install --save winston-datadog-udp-transport
```

## Example

### Basic setup

```jscript
const winston = require('winston');
const udpTransport = require('');
const ddUdpTransport = new udpTransport({
    host: '127.0.0.1',
    port: 10518
});
const logger = new winston.Logger({
    transports: [
        ddUdpTransport
    ]
});
```