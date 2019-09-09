import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/NavBar';
import About from './pages/About';
import Register from './pages/Register';

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
        </Switch>
      </Router>      
    </>
  )
}

export default PageRouter
