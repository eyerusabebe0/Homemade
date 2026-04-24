import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const submit = () => {
    if (!form.name || !form.email || !form.password)
      return setError("Fill all fields");

    if (!form.email.includes("@"))
      return setError("Invalid email");

    if (form.password.length < 6)
      return setError("Password must be 6+ chars");

    localStorage.setItem("user", JSON.stringify(form));
    nav("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">

      <div className="bg-white p-5 w-full max-w-md rounded-xl">

        <h2 className="text-[#c2185b] text-xl font-bold mb-4">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          placeholder="Name"
          className="w-full border p-2 mb-2"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-2"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <div className="flex border p-2 items-center mb-3">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full outline-none"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <span onClick={() => setShow(!show)}>
            {show ? <EyeOff /> : <Eye />}
          </span>
        </div>

        <button onClick={submit} className="w-full bg-[#c2185b] text-white py-2">
          Create Account
        </button>

      </div>
    </div>
  );
}

export default SignUp;