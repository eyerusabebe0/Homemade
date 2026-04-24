import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductList() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  if (!state) {
    return (
      <div className="p-4">
        <p>No product found</p>
        <button onClick={() => navigate("/")} className="text-[#c2185b]">
          Go back
        </button>
      </div>
    );
  }

  const total = qty * Number(state.price);

  const buyNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const purchase = {
      id: Date.now(),
      title: state.title,
      image: state.image,
      price: state.price,
      quantity: qty,
      total,
      user: user?.name,
    };

    const old = JSON.parse(localStorage.getItem("purchases") || "[]");
    old.push(purchase);

    localStorage.setItem("purchases", JSON.stringify(old));

    alert("Added to dashboard");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center p-4">

      <div className="bg-white rounded-xl shadow max-w-md w-full overflow-hidden">

        <img src={state.image} className="w-full h-60 object-cover" />

        <div className="p-4">

          <h2 className="text-xl font-bold text-[#c2185b]">
            {state.title}
          </h2>

          <p className="text-gray-600 mt-1">
            {state.price} ETB
          </p>

          <p className="mt-3 text-sm text-gray-700">
            {state.description}
          </p>

          {/* QUANTITY CONTROL */}
          <div className="flex items-center justify-between mt-4 border rounded p-2">

            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3 text-xl"
            >
              -
            </button>

            <span className="font-bold">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 text-xl"
            >
              +
            </button>

          </div>

          {/* TOTAL */}
          <p className="mt-3 font-bold text-[#c2185b]">
            Total: {total} ETB
          </p>

          <button
            onClick={buyNow}
            className="mt-4 w-full bg-[#c2185b] text-white py-2 rounded"
          >
            Buy Now
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-2 w-full border border-[#c2185b] text-[#c2185b] py-2 rounded"
          >
            Back
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductList;