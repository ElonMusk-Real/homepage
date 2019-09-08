import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/Home';

interface PageRouterProps {
  
}

const PageRouter: React.FC<PageRouterProps> = () => {
  return (
    <div>
      <Router>
        <Route path='/' exact component={Home}/>
      </Router>      
    </div>
  )
}

export default PageRouter
