import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer';
let store = createStore(reducer);


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter/>
      </Provider>

    </div>
  );
}

export default App;
