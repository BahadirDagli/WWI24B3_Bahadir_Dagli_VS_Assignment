const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log('MS2 verbunden mit MQTT');
    client.subscribe('events');
});

client.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());

    console.log(`Event: ${data.resourceType} ${data.action} (ID: ${data.id})`);
});