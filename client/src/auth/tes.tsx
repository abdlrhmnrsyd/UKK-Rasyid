import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Contoh log untuk username dan password
    console.log("Username:", username, "Password:", password);

    // Alert sebagai placeholder untuk logika login
    alert("Login berhasil!");
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        {/* Bagian kiri dengan gambar */}
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
                Meraki UI
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In autem
                ipsa, nulla laboriosam dolores, repellendus perferendis libero
                suscipit nam temporibus molestiae.
              </p>
            </div>
          </div>
        </div>

        {/* Bagian kanan dengan form login */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
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
                className="bg-white p-8 rounded shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <a
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
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
