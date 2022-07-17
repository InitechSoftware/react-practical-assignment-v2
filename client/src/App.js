import {useEffect} from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {

  useEffect(() => {
    // TEST API, it might be removed
    fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
      console.log('API CONNECTION IS OK');
    }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'));

    //TEST SOCKET, it also might be removed
    const socket = io('http://localhost:8081', {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socket.on('live', (status) => console.log(`Socket connection: ${status}`));
  }, []);

  return (
    <div className="App">
      TASK IMPLEMENTATION HERE
    </div>
  );
}

export default App;
