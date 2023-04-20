import React, {PropsWithChildren} from 'react';
import './App.css';

function App(props: PropsWithChildren) {
  return (
    <div className="App">
      <header className="App-header">
        {props.children}
      </header>
    </div>
  );
}

export default App;
