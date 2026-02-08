import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard onBackToHome={() => setShowDashboard(false)} />;
  }

  return <LandingPage onGetStarted={() => setShowDashboard(true)} />;
}