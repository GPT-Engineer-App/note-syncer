import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import Index from "./pages/Index.jsx";
import LoginPage from './pages/LoginPage.jsx';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      <Navigate to="/login" replace />
    }
  }, [user, loading]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={user ? <Index /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;