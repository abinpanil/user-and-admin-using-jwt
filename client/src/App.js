
import './App.css';
import Router from './Router';
import axios from "axios";
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL="http://localhost:2000";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>

  );
}

export default App;
