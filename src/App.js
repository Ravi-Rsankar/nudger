import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as mqtt from 'react-paho-mqtt';

function App() {
  const [client, setClient] = React.useState(null);
  const _topic = ["Hello"];
  const _options = {};

  React.useEffect(() => {
    _init();
  }, [])

  const _init = () => {
    const c = mqtt.connect(process.env.REACT_APP_WS_HOST, Number(process.env.REACT_APP_WS_PORT), "mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
    setClient(c);
  }

  // called when sending payload
  const _sendPayload = () => {
    const payload = mqtt.parsePayload("Hello", "World"); // topic, payload
    console.log(payload)
    client.send(payload);
  }

  // called when client lost connection
  const _onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  }

  // called when messages arrived
  const _onMessageArrived = message => {
    console.log("onMessageArrived: " + message.payloadString);
  }


  // called when subscribing topic(s)
  const _onSubscribe = () => {
    client.connect({
      onSuccess: () => {
        for (var i = 0; i < _topic.length; i++) {
          client.subscribe(_topic[i], _options);
        }
      }
    }); // called when the client connects
  }

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    for (var i = 0; i < _topic.length; i++) {
      client.unsubscribe(_topic[i], _options);
    }
  }

  // called when disconnecting the client
  const _onDisconnect = () => {
    client.disconnect();
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          style={{ color: 'white' }}
          onClick={_onSubscribe}>
          <h1>Subscribe Topic</h1>
        </button>
        <button
          style={{ color: 'white' }}
          onClick={_sendPayload}>
          <h1>Send Message</h1>
        </button>
      </header>
    </div>
  );
}

export default App;