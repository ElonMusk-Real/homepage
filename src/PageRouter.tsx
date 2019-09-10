import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/NavBar';

import {Home, About, Register, Login, Profile } from './pages'

interface PageRouterProps {
  
}

const PageRouter: React.FC<PageRouterProps> = () => {
  return (
    <>
      <Router>
        <Navbar title='NATA Danus' />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </Router>      
    </>
  )
}

export default PageRouter
