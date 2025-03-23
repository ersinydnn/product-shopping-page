import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/Slices/cartSlice";

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      dispatch(clearCart());
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      {isProcessing ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
          <p className="mt-4 text-lg font-semibold">Processing your order...</p>
        </div>
      ) : isCompleted ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-700">
            Order Completed! 🎉
          </h1>
          <p className="mt-2 text-lg">Thank you for your purchase.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold transition transform hover:scale-105 duration-300"
          >
            Return to Home
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-purple-700">Checkout</h1>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800 transition duration-300"
            >
              Complete Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
