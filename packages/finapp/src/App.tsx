import React, {useEffect, useState} from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';

function App() {
  const [key, setKey] = useState<string>();
  useEffect(() => {
    console.log(`Connecting to API ${API_URL}`);
    fetch(`${API_URL}/whois`)
      .then(r => r.text())
      .then(r => setKey(r))
      .catch(() => setKey(undefined));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {key ? `API Key: ${key}` : `No connection to ${API_URL}`}
        </p>
      </header>
    </div>
  );
}

export default App;
