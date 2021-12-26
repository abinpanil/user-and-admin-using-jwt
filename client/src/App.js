
import './App.css';
import Router from './Router';
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
