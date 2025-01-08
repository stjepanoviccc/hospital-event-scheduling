import { useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  useEffect(() => {
    axios.get('/')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return <div>Hello MERN Stack!</div>;
}

export default App
