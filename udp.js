const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello rsyslog from Node.js over UDP!');
const rsyslogHost = 'localhost'; // Use the hostname or IP address of your rsyslog server
const rsyslogPort = 10514;

client.send(message, rsyslogPort, rsyslogHost, (error) => {
    if (error) {
        console.error('Error sending message:', error);
        client.close();
    } else {
        console.log('Message sent!');
        client.close();
    }
});