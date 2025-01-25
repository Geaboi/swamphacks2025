import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-2xl ${className}`}>{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`py-2 px-4 rounded-lg text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    className={`border rounded-lg p-2 w-full ${className}`}
    {...props}
  />
);

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const firebaseConfig = {
    apiKey: FireBaseKey,
    authDomain: "flamefinder-59d9d.firebaseapp.com",
    projectId: "flamefinder-59d9d",
    storageBucket: "flamefinder-59d9d.firebasestorage.app",
    messagingSenderId: "924299033565",
    appId: "1:924299033565:web:284ab7cf1e1b1abfc81434",
    measurementId: "G-7B82SGKJ7C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login successful:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error('Error logging in:', errorCode, errorMessage);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <Card className="w-full max-w-sm p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
