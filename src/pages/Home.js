import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";

const Product = lazy(() => import("../components/Product"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-purple-600"></div>
  </div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Ürünleri çekerken hata oluştu:", error));

    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("Kategorileri çekerken hata oluştu:", error)
      );
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Kategori Seçme Menüsü - Responsive */}
      <div className="flex overflow-x-auto scrollbar-hidden gap-4 mb-6 px-2 sm:px-4">
        <button
          className={`px-6 py-3 whitespace-nowrap border rounded-md font-semibold transition 
                      transform hover:scale-110 duration-200 ease-in-out
                      ${
                        selectedCategory === "all"
                          ? "bg-purple-700 text-white border-purple-700"
                          : "bg-purple-100 text-purple-700 border-purple-500 hover:bg-purple-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                      }`}
          onClick={() => setSelectedCategory("all")}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 whitespace-nowrap border rounded-md font-semibold transition 
                        transform hover:scale-110 duration-200 ease-in-out 
                        ${
                          selectedCategory === category
                            ? "bg-purple-700 text-white border-purple-700"
                            : "bg-purple-100 text-purple-700 border-purple-500 hover:bg-purple-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                        }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
