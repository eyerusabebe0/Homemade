import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, DollarSign, FileText } from "lucide-react";

function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.title) return "Title required";
    if (!form.price) return "Price required";
    if (!form.description) return "Description required";
    if (!form.image) return "Image URL required";
    return "";
  };
const submit = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const newItem = {
    ...form,
    id: Date.now(),
    owner: user.name,
    status: "pending"
  };

  const pending = JSON.parse(localStorage.getItem("pendingProducts") || "[]");

  pending.push(newItem);

  localStorage.setItem("pendingProducts", JSON.stringify(pending));

  navigate("/dashboard");
};
const handleSubmit = () => {
const err = validate();
if (err) return setError(err);

const user = JSON.parse(localStorage.getItem("user"));

const newProduct = {
id: Date.now(),
title: form.title,
price: Number(form.price),
description: form.description,
image: form.image,
owner: user?.name,
};

const products = JSON.parse(localStorage.getItem("products") || "[]");
products.push(newProduct);

localStorage.setItem("products", JSON.stringify(products));

setError("");
alert("Product posted");
navigate("/dashboard");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center text-[#c2185b] mb-5">
          Add Product
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 text-sm rounded mb-3">
            {error}
          </p>
        )}

        <div className="flex items-center border rounded mb-3 px-2">
          <FileText size={18} />
          <input
            name="title"
            placeholder="Product Title"
            onChange={handleChange}
            className="w-full p-2 outline-none"
          />
        </div>

        <div className="flex items-center border rounded mb-3 px-2">
          <DollarSign size={18} />
          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full p-2 outline-none"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded outline-none"
        />

        <div className="flex items-center border rounded mb-4 px-2">
          <Image size={18} />
          <input
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full p-2 outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#c2185b] text-white py-2 rounded hover:bg-pink-700"
        >
          Post Product
        </button>

      </div>
    </div>
  );
}

export default AddProduct;