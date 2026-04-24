import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const login = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return setError("No account");

    if (user.email !== form.email)
      return setError("Wrong email");

    if (user.password !== form.password)
      return setError("Wrong password");

    nav("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-50 p-4">

      <div className="bg-white p-5 w-full max-w-md">

        <h2 className="text-[#c2185b] font-bold text-xl mb-3">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Email"
          className="w-full border p-2 mb-2"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2 mb-3"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={login} className="w-full bg-[#c2185b] text-white py-2">
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;