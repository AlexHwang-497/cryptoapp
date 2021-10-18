import React from "react";
import {Switch,Route,Link} from 'react-router-dom'
import {Layout,Typography,Space} from 'antd'

import {Exchanges, Homepage, News, Cryptocurrencies, NavBar, CryptoDetails } from "./Components/CompIndex";
import './App.css'

// ! you left off at 1:17:59 on 10/14/2021
//*<Route exact path='/'></Route>; this means that it will trigger only if you go exactly ot that url
  // *<homepage> is the compnent that we will provide underthat route

  const App = () => (
    <div className="app">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
            <Link to="/">
              Cryptoverse Inc.
            </Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
  
  export default App;
  