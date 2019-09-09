import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/NavBar';
import About from './pages/About';

interface PageRouterProps {
  
}

const PageRouter: React.FC<PageRouterProps> = () => {
  return (
    <>
      <Navbar title='NATA Danus' />
      <Router>
        <div>
          <Route path='/' exact component={Home}/>
          <Route path='/about' component={About}/>
        </div>
      </Router>      
    </>
  )
}

export default PageRouter
