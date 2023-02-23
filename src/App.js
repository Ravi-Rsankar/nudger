import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as mqtt from 'react-paho-mqtt';
import { _initMQTT, _onSubscribe, _publishPayload } from './services/mqtt/MQTTHandler';

function App() {
  const [client, setClient] = React.useState(null);
  const _topic = ["Hello"];
  const _payload = "World!";

  React.useEffect(() => {
    const _client = _initMQTT(mqtt, process.env.REACT_APP_WS_HOST, Number(process.env.REACT_APP_WS_PORT));
    setClient(_client)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          style={{ color: 'white' }}
          onClick={() => _onSubscribe(client, _topic)}>
          <h1>Subscribe Topic</h1>
        </button>
        <button
          style={{ color: 'white' }}
          onClick={() => _publishPayload(client, _topic[0], _payload)}>
          <h1>Send Message</h1>
        </button>
      </header>
    </div>
  );
}

export default App;