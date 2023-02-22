import React, { useState, useEffect } from 'react';
import { client } from 'paho-mqtt';

const MQTTComponent = () => {
    const [mqttClient, setMqttClient] = useState(null);

    useEffect(() => {
        const newClient = new client('ws://broker.example.com:9001/ws', 'clientId');
        newClient.onConnectionLost = onConnectionLost;
        newClient.onMessageArrived = onMessageArrived;
        newClient.connect({ onSuccess: onConnect });

        setMqttClient(newClient);
    }, []);

    const onConnect = () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe('my/topic');
    };

    const onConnectionLost = (responseObject) => {
        console.log('Connection lost: ' + responseObject.errorMessage);
    };

    const onMessageArrived = (message) => {
        console.log('Message received: ' + message.payloadString);
    };

    const handleButtonClick = () => {
        const message = new Message('Hello, MQTT!');
        message.destinationName = 'my/topic';
        mqttClient.send(message);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Publish message</button>
        </div>
    );
};

export default MQTTComponent;
