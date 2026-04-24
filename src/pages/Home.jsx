import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

 const products = JSON.parse(localStorage.getItem("products") || "[]")
  .filter(p => p.status === "approved");

  const goDetail = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow">

            <img src={item.image} className="h-48 w-full object-cover" />

            <div className="p-3">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.price}</p>

              <button
                onClick={() => goDetail(item)}
                className="mt-3 w-full bg-[#c2185b] text-white py-2 rounded"
              >
                View Detail
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;