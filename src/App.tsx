import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AppRouter } from './router/index';



const App = () => (
  <Router>
    <AppRouter />
  </Router>
);

export default App;
