const express = require('express')
const app = express()
const port = 3001

const winston = require('winston');
const { combine, timestamp, json } = winston.format;

//require('winston-rsyslog2');



const dgram = require('dgram');
const { format } = require('logform');

class UdpTransport extends winston.Transport {
    constructor(opts) {
      super(opts);
      this.udpClient = dgram.createSocket('udp4');
      this.host = opts.host;
      this.port = opts.port;
    }
  
    log(info, callback) {
      setImmediate(() => {
        this.emit('logged', info);
      });
  
      const logMessage = JSON.stringify(info);
  
      this.udpClient.send(logMessage, 0, logMessage.length, this.port, this.host, (err) => {
        if (err) {
          console.error('Failed to send log message', err);
        }
      });
  
      callback();
    }
  }
  
  const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new UdpTransport({
        host: 'localhost', // Use your rsyslog server IP or hostname
        port: 514 // Ensure this matches the port configured in rsyslog
      })
    ]
  });
  
  logger.info('Hello, this is a test log message!');
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server A listening on port ${port}`)
})