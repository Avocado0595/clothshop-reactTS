import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './index.scss'
import App from './App'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserContext from './context/userContext'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    
      <App/>
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
