import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CrazyForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    address: "",
    postalCode: "",
    area: "",
    dateofPurchase: "",
    sale: false,
    price: "",
    ownerID: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-300 via-blue-500 to-purple-600"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-amber-50 p-8 rounded-2xl shadow-lg max-w-lg w-full space-y-4"
      >
        <h2 className=" text-2xl font-bold text-center text-gray-800">Land Registration Form</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="input-style"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="input-style  border-zinc-500"
          accept="image/*"
        />
        {formData.image && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="h-32 w-32 object-cover mt-4"
            />
          </div>
        )}
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="input-style"
          required
        />
        <input
          type="number"
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleChange}
          className="input-style"
          required
        />
        <input
          type="number"
          name="area"
          placeholder="Area (sq ft)"
          onChange={handleChange}
          className="input-style"
          required
        />
        <input
          type="date"
          name="dateofPurchase"
          onChange={handleChange}
          className="input-style"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="input-style"
          required
        />
        <input
          type="text"
          name="ownerID"
          placeholder="Owner ID"
          onChange={handleChange}
          className="input-style"
        />

        <div className="flex items-center justify-between">
          <span className="text-gray-700">For Sale</span>
          <input
            type="checkbox"
            checked={formData.sale}
            onChange={() => setFormData({ ...formData, sale: !formData.sale })}
            className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
}