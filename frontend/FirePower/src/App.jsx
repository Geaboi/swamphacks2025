import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './LoginPage';
import CameraPage from './CameraPage';
import Dashboard from './Dashboard';
import SignupForm from './SignupPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupForm/>} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/dash" element={<Dashboard/>} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
