const mqtt = require('mqtt');

const mqttHost = process.env.MQTT_HOST || 'localhost';
const client = mqtt.connect(`mqtt://${mqttHost}:1883`);

client.on('connect', () => {
    console.log(`MS1 ist mit MQTT verbunden (${mqttHost}:1883)`);
});

client.on('error', (error) => {
    console.error('MQTT-Fehler:', error.message);
});

module.exports = client;