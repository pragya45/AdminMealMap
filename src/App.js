import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Sidebar from './components/Sidebar';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="app">
      {token ? (
        <>
          <Sidebar />
          <div className="main-content">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default App;
