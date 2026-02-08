import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { StandardEstimate } from './components/StandardEstimate';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-50 transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/estimate"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/standard-estimate"
                element={
                  <ProtectedRoute>
                    <StandardEstimate />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}