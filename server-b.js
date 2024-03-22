const express = require('express')
const app = express()
const port = 3001

const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  defaultMeta: {
    service: 'SERVICE-B',
  },
  transports: [
    new winston.transports.File({
      filename: 'combined-b.log',
    }),
  ],
});

logger.info('Info B message');
logger.error('Error B message');
logger.warn('Warning B message');



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server B listening on port ${port}`)
})