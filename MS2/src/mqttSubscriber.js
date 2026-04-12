const mqtt = require('mqtt');

const mqttHost = process.env.MQTT_HOST || 'localhost';
const client = mqtt.connect(`mqtt://${mqttHost}:1883`);

client.on('connect', () => {
    console.log(`MS2 verbunden mit MQTT (${mqttHost}:1883)`);
    client.subscribe('events');
});

client.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());
    console.log(`Event: ${data.resourceType} ${data.action} (ID: ${data.id})`);
});

client.on('error', (error) => {
    console.error('MS2 MQTT-Fehler:', error.message);
});