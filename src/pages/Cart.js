import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CartItem = lazy(() => import("../components/CartItem"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-purple-600"></div>
  </div>
);

const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <>
      {cart.length > 0 ? (
        <div className="min-h-[80vh] grid md:grid-cols-2 max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-between p-2">
            <Suspense fallback={<LoadingSpinner />}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Suspense>
          </div>
          <div>
            <div className="flex flex-col justify-center items-end p-5 space-y-5 mt-14">
              <h1 className="font-semibold text-lg text-purple-800">
                YOUR CART SUMMARY
              </h1>
              <p>
                <span className="text-gray-700 dark:text-white font-semibold">
                  Total Items
                </span>{" "}
                : {cart.length}
              </p>
              <p>
                <span className="text-gray-700 dark:text-white font-semibold">
                  Total Amount
                </span>{" "}
                : ${totalAmount}
              </p>
              {/* Checkout yönlendirme */}
              <button
                onClick={() => navigate("/checkout")}
                className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 dark:text-white font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>
          <Link to={"/"}>
            <button className="bg-purple-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-purple-600 font-bold hover:text-purple-700 p-3">
              SHOP NOW
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
