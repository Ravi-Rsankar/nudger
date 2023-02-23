import * as mqtt from 'react-paho-mqtt';

// const client = null;
export const _initMQTT = (mqtt, host, port) => {
    const client = mqtt.connect(host, port, "mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    return client
}

// called when sending payload
export const _publishPayload = (client, topic, payload) => {
    const _payload = mqtt.parsePayload(topic, payload);
    console.log(_payload)
    client.send(_payload);
}

// called when client lost connection
export const _onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// called when messages arrived
export const _onMessageArrived = message => {
    console.log("onMessageArrived: " + message.payloadString);
}


// called when subscribing topic(s)
export const _onSubscribe = (client, topics) => {
    const _options = {};
    client.connect({
        onSuccess: () => {
            for (var i = 0; i < topics.length; i++) {
                client.subscribe(topics[i], _options);
            }
        }
    }); // called when the client connects
}

// called when subscribing topic(s)
export const _onUnsubscribe = (client, topics) => {
    const _options = {};
    for (var i = 0; i < topics.length; i++) {
        client.unsubscribe(topics[i], _options);
    }
}

// called when disconnecting the client
export const _onDisconnect = (client) => {
    client.disconnect();
}