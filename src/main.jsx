// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// ১. ইম্পোর্ট পাথটি পরিবর্তন করুন
import AuthProvider from './context/AuthProvider.jsx' // <-- './context/AuthContext.jsx' এর বদলে

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- এটি আগের মতোই থাকবে */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)