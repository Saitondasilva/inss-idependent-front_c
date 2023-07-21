import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store, {persistor}  from './Redux/store';
import axios from "axios";
import { PersistGate} from "redux-persist/integration/react";
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
</Provider>
);*/
axios.defaults.baseURL = `${process.env.REACT_APP_API_HOST}/api`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
    
    </Provider>
      
  </React.StrictMode>,
  document.getElementById("root")
);
