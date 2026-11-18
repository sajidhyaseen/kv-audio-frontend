import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import VerifyEmail from './pages/verifyEmail/verifyEmail';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import ResetPassword from './pages/resetPassword/resetPassword';
import ScrollToTop from './components/scrollToTop';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  throw new Error('VITE_GOOGLE_CLIENT_ID is required.');
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
              background: "#0f172a",
              color: "#fff",
              fontSize: "14px",
              border: "1px solid rgba(255,255,255,.10)",
              padding: "12px 14px",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App
