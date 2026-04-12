const client = require('../config/mqtt');

function publishEvent(resourceType, id, action) {
    const payload = JSON.stringify({
        resourceType,
        id,
        action
    });

    client.publish('events', payload, (err) => {
        if (err) {
            console.error('Fehler beim Senden des MQTT-Events:', err.message);
            return;
        }

        console.log('MQTT-Event gesendet:', payload);
    });
}

module.exports = {
    publishEvent
};