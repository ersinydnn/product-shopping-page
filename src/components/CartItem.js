import React from "react";
import { Delete } from "@mui/icons-material";
import { remove } from "../redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const CartItem = ({ item }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const removeItemFromCart = () => {
    dispatch(remove(item.id));
    enqueueSnackbar(`Item removed from your cart!`, {
      variant: "warning",
      autoHideDuration: 3000,
    });
  };

  return (
    <>
      <div className="flex items-center p-5 justify-between bg-violet-200 dark:bg-gray-800 mt-2 mb-2 rounded-xl">
        <div className="flex p-3">
          <img src={item.image} className="h-28 rounded-lg" alt="" />
          <div className="ml-10 self-start space-y-5">
            <h1 className="text-xl text-purple-700 dark:text-white font-semibold">
              {item.title}
            </h1>
            <p className="dark:text-gray-300">${item.price}</p>
          </div>
        </div>
        <div
          onClick={removeItemFromCart}
          className="bg-purple-300 dark:bg-purple-500 hover:bg-purple-400 dark:hover:bg-purple-600 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
        >
          <Delete className="text-gray-800 dark:text-white" />
        </div>
      </div>
    </>
  );
};

export default CartItem;
