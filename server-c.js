const express = require('express')
const app = express()
const port = 3002

const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  defaultMeta: {
    service: 'SERVICE-C',
  },
  transports: [
    new winston.transports.File({
      filename: 'combined-c.log',
    }),
  ],
});

logger.info('Info C message');
logger.error('Error C message');
logger.warn('Warning C message');



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server C listening on port ${port}`)
})