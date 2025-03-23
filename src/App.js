import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
  </div>
);

const App = () => {
  return (
    <>
      <Router>
        <SnackbarProvider
          TransitionComponent={Slide}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Navbar />

          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/checkout" element={<Checkout />} />
            </Routes>
          </Suspense>
        </SnackbarProvider>
      </Router>
    </>
  );
};

export default App;
