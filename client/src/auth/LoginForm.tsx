import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({ username: '', password: '' });

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        if (data.field === 'username') {
          setErrors(prev => ({ ...prev, username: data.message }));
        } else if (data.field === 'password') {
          setErrors(prev => ({ ...prev, password: data.message }));
        } else {
          setErrors({
            username: 'Invalid username or password',
            password: 'Invalid username or password'
          });
        }
        return;
      }

      localStorage.setItem('token', data.token);
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Login error:', error.message);
      setErrors({
        username: 'Login failed',
        password: 'Login failed'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
    
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                SMKN 2 Padang Panjang
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem
                ipsa, nulla laboriosam dolores, repellendus perferendis libero
                suscipit nam temporibus molestiae.
              </p>
            </div>
          </div>
        </div>

       
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
              <img
                  className="w-auto h-12 sm:h-14"
                  src="./../../public/images/logo.png"
                  alt="Logo"
                />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form
                onSubmit={handleSubmit}
                className=" dark:bg-gray-900 p-8 rounded shadow-md"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Username</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    required
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white">Password</label>
                  <input
                    type="password"
                    className={`w-full px-4 py-2 mt-2 border rounded-md ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    required
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">
                Belum Punya Akun?{" "}
                <a
                  href="register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Buat Akun Dulu Bree !
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
