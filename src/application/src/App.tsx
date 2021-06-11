import React from 'react';
import './App.css';
import { HomePage } from './components/Home';
import { UrlDataContext} from './store/app.context.interface';
import {useUrlContextValue} from './store/app.context';

function App() {
  const UrlDataHook = useUrlContextValue();
  return (
    <UrlDataContext.Provider value={UrlDataHook}>
        <HomePage />
      </UrlDataContext.Provider>
  );
}

export default App;
