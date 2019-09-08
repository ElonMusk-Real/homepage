import React from 'react';
import Navbar from './components/NavBar';
import PageRouter from './PageRouter';

const App: React.FC = () => {
  return (
    <div>
      <Navbar title='NATA Danus'>
        <PageRouter />
      </Navbar>
    </div>
  );
}

export default App;
