import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'ws://mqtt-broker.example.com:9001'; // Replace with your MQTT broker URL
const MQTT_TOPIC = 'my/topic'; // Replace with your MQTT topic

function MyComponent() {
    const [mqttClient, setMqttClient] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const client = mqtt.connect(MQTT_BROKER_URL);

        client.on('connect', () => {
            console.log('MQTT client connected');
            client.subscribe(MQTT_TOPIC);
        });

        client.on('message', (topic, payload) => {
            console.log(`Received message on topic ${topic}: ${payload.toString()}`);
            setMessage(payload.toString());
        });

        setMqttClient(client);

        return () => {
            if (client) {
                client.end();
            }
        };
    }, []);

    return (
        <div>
            <h1>MQTT Example</h1>
            <p>Message received: {message}</p>
        </div>
    );
}

export default MyComponent;
