import './App.css';
import Room from './room'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateRoom from './CreateRoom.js'
import {AppProvider} from './Context'
import { io } from "socket.io-client"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const socket = io('https://liveroom-server.herokuapp.com/')

const firebaseConfig = {
  apiKey: "AIzaSyCUFCtHNil3cp9ZiLOd4pdIBXXRi3ypkq8",
  authDomain: "liveroom-chat.firebaseapp.com",
  projectId: "liveroom-chat",
  storageBucket: "liveroom-chat.appspot.com",
  messagingSenderId: "468550046580",
  appId: "1:468550046580:web:6f7b4c3be386bd4bc2d221",
  measurementId: "G-CEJ03KM67C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {

  return (
    <div className="App">
     <AppProvider>
      <Routes>
        <Route path="/" element={<Room data={socket} />} />
        <Route path="/createroom" element={<CreateRoom data={socket} />} />
      </Routes>
     </AppProvider>
    </div>
  );
}

export default App;
