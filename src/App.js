import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App() {
  const { signOut } = useAuthenticator();
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
      </header>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
}

export default withAuthenticator(App, true);