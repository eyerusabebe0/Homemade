import React, { useState, useEffect } from "react";
import { MapPin, ShoppingBag, Upload, Edit, Trash2 } from "lucide-react";

function User() {
  const [purchases, setPurchases] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);

    const buy = JSON.parse(localStorage.getItem("purchases") || "[]");
    const post = JSON.parse(localStorage.getItem("pendingProducts") || "[]");

    setPurchases(buy);
    setPosts(post.filter((p) => p.owner === u?.name));
  }, []);

  // SUBTOTAL
  const subtotal = purchases.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  // VAT 10%
  const vat = subtotal * 0.1;

  // FINAL TOTAL AFTER VAT CUT
  const total = subtotal - vat;

  // DELETE POST
  const deletePost = (id) => {
    const all = JSON.parse(localStorage.getItem("pendingProducts") || "[]");

    const updated = all.filter((p) => p.id !== id);

    localStorage.setItem("pendingProducts", JSON.stringify(updated));

    setPosts(updated.filter((p) => p.owner === user?.name));
  };

  // EDIT POST
  const editPost = (id) => {
    const newTitle = prompt("New title");
    const newPrice = prompt("New price");

    const all = JSON.parse(localStorage.getItem("pendingProducts") || "[]");

    const updated = all.map((p) =>
      p.id === id
        ? {
            ...p,
            title: newTitle || p.title,
            price: Number(newPrice) || p.price,
          }
        : p
    );

    localStorage.setItem("pendingProducts", JSON.stringify(updated));

    setPosts(updated.filter((p) => p.owner === user?.name));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <h1 className="text-2xl font-bold text-[#c2185b]">
          Welcome {user?.name || "Guest"}
        </h1>

        <p className="text-gray-500 text-sm">
          Your dashboard activity
        </p>

        {/* VAT BLOCK */}
        <div className="mt-3 text-sm">

          <p className="text-gray-600">
            Subtotal: <span className="font-semibold">{subtotal} ETB</span>
          </p>

          <p className="text-gray-600">
            VAT (10%): <span className="font-semibold text-red-500">- {vat.toFixed(2)} ETB</span>
          </p>

          <p className="text-[#c2185b] font-bold mt-1">
            Final Total: {total.toFixed(2)} ETB
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* PURCHASES */}
        <div>

          <h2 className="flex items-center gap-2 font-semibold text-[#c2185b] mb-3">
            <ShoppingBag size={18} />
            What You Bought
          </h2>

          {purchases.length === 0 && (
            <p className="text-gray-500">No purchases yet</p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">

            {purchases.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <img
                  src={item.image}
                  className="h-40 w-full object-cover"
                />

                <div className="p-3">

                  <h2 className="font-semibold">{item.title}</h2>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-[#c2185b] font-bold">
                    {item.total} ETB
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* POSTS */}
        <div>

          <h2 className="flex items-center gap-2 font-semibold text-[#c2185b] mb-3">
            <Upload size={18} />
            What You Posted
          </h2>

          {posts.length === 0 && (
            <p className="text-gray-500">No posts yet</p>
          )}

          <div className="grid sm:grid-cols-2 gap-4">

            {posts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                <img
                  src={item.image}
                  className="h-40 w-full object-cover"
                />

                <div className="p-3">

                  <h2 className="font-semibold">{item.title}</h2>

                  <p className="text-gray-500 text-sm">
                    Status: {item.status}
                  </p>

                  <p className="text-[#c2185b] font-bold">
                    {item.price} ETB
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 mt-3">

                    <button
                      onClick={() => editPost(item.id)}
                      className="flex-1 bg-blue-500 text-white py-1 rounded flex items-center justify-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </button>

                    <button
                      onClick={() => deletePost(item.id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default User;