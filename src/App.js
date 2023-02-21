import React, { useEffect } from 'react';
import mqtt from 'mqtt';

function App() {

  useEffect(() => {
    const client = mqtt.connect('mqtt://test.mosquitto.org');

    client.on('connect', function () {
      client.subscribe('test', function (err) {
        if (!err) {
          console.log('Subscribed to test topic.');
        }
      })
    })

    client.on('message', function (topic, message) {
      console.log(topic, message.toString());
    })

    return () => {
      client.end();
    }

  }, []);

  return (
    <div className="App">
      <h1>MQTT Subscriber</h1>
    </div>
  );
}

export default App;
