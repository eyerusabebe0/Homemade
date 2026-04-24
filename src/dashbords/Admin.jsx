import React, { useState, useEffect } from "react";

function Admin() {
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setPending(JSON.parse(localStorage.getItem("pendingProducts") || "[]"));
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
  }, []);

const approve = (id) => {
  const pending = JSON.parse(localStorage.getItem("pendingProducts") || "[]");
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  const item = pending.find(p => p.id === id);

  products.push({ ...item, status: "approved" });

  localStorage.setItem("products", JSON.stringify(products));

  const updated = pending.filter(p => p.id !== id);
  localStorage.setItem("pendingProducts", JSON.stringify(updated));
};

  return (
    <div className="min-h-screen bg-pink-50 p-6">

      <h1 className="text-2xl font-bold text-[#c2185b] mb-4">
        Admin Dashboard
      </h1>

      {/* PENDING PRODUCTS */}
      <h2 className="font-semibold mb-2">Pending Products</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        {pending.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded-xl shadow">

            <img src={p.image} className="h-40 w-full object-cover" />

            <h2 className="font-bold">{p.title}</h2>

            <button
              onClick={() => approve(p.id)}
              className="mt-2 w-full bg-[#c2185b] text-white py-2 rounded"
            >
              Approve
            </button>

          </div>
        ))}

      </div>

      {/* USERS */}
      <h2 className="font-semibold mb-2">Users</h2>

      <div className="grid md:grid-cols-3 gap-4">

        {users.map((u) => (
          <div key={u.id} className="bg-white p-3 rounded-xl shadow">
            <h2 className="font-bold">{u.name}</h2>
            <p className="text-gray-500">{u.email}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Admin;