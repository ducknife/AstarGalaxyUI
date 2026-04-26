import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ParticleGrid from './components/ui/ParticleGrid';
import ScrollToTop from './components/ui/buttons/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <ParticleGrid />
      <AppRoutes />
      <ScrollToTop />
    </Router>
  );
}

export default App;
