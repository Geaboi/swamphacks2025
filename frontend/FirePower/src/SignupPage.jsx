import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const firebaseConfig = {
      apiKey: process.env.FireBaseKey,
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
  
    const handleSignup = (e) => {
      e.preventDefault();
  
      if (!email || !password) {
        setError('Please fill in both fields.');
        return;
      }
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Signup successful:', user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.error('Error signing up:', errorCode, errorMessage);
        });
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Card className="w-full max-w-sm p-4">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  export default SignupForm;