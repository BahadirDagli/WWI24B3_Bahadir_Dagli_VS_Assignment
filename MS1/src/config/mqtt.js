const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('MS1 ist mit MQTT verbunden');
});

client.on('error', (error) => {
    console.error('MQTT-Fehler:', error.message);
});

module.exports = client;