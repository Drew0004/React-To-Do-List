import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import MyHeader from './components/MyHeader.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyHeader/>
    <App />
  </React.StrictMode>,
)
