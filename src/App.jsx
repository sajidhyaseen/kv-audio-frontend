import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import VerifyEmail from './pages/verifyEmail/verifyEmail';

// Set VITE_GOOGLE_CLIENT_ID in Vercel / .env. The fallback is the client ID you were already using (it is public).
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || '653992077795-ic89v41lkt66c3pbhsctietk1jnlk9vu.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App
