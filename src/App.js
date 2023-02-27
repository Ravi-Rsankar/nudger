import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import * as mqtt from 'react-paho-mqtt';
import { _initMQTT, _onSubscribe, _publishPayload } from './services/mqtt/MQTTHandler';
import SearchBox from './services/search/SearchBox';

function App() {
    const [client, setClient] = React.useState(null);
    const _topic = ["Hello"];
    const _payload = "World!";

    useEffect(() => {
        const _client = _initMQTT(mqtt, process.env.REACT_APP_WS_HOST, Number(process.env.REACT_APP_WS_PORT));
        setClient(_client)
        _onSubscribe(_client, _topic)
    }, [])

    return (
        <div className="App">
            <div className='search-container'>
                <SearchBox />
            </div>
            <header className="App-header">
                {/* <button
                    style={{ color: 'white' }}
                    onClick={() => _onSubscribe(client, _topic)}>
                    <h1>Subscribe Topic</h1>
                </button> */}
                {/* <button
                    style={{ color: 'white' }}
                    onClick={() => _publishPayload(client, _topic[0], _payload)}>
                    <h1>Send Message</h1>
                </button> */}
            </header>
        </div>
    );
}

export default App;