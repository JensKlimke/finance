import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [key, setKey] = useState<string>();
  useEffect(() => {
    console.log('RENDER');
    fetch('http://localhost:8000')
      .then(r => r.text())
      .then(r => setKey(r))
      .catch(() => setKey(undefined));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {key ? `API Key: ${key}` : 'No connection'}
        </p>
      </header>
    </div>
  );
}

export default App;
