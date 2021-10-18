import React from "react";
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux'

import App from './App'
import store from "./app/store";
import 'antd/dist/antd.css'

// * as we store <App/> inside of the <Provider store = {store}>; the app will have all the acess to thecomponets of REDUX

ReactDom.render(
  <Router>
    <Provider store = {store}>
      <App/>
    </Provider>
  </Router>
  ,document.getElementById('root')

  )