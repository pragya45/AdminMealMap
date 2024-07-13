import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Restaurants from './pages/Restaurants';
import Reviews from './pages/Reviews';
import Users from './pages/Users';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff7043', // Custom primary color
    },
    secondary: {
      main: '#ffca28', // Custom secondary color
    },
    background: {
      default: '#f4f4f4', // Custom background color
    },
  },
  typography: {
    fontFamily: 'Inika, serif', // Custom font family
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </ThemeProvider>
  </React.StrictMode>
);
