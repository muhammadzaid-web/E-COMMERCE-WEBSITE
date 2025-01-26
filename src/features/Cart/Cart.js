import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { deleteItemFromCartAsync, selectItem, updateCartAsync, updateItemsAsync } from "./CartSlice"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItem);
  const totalAmount = Math.round(items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  ));
  const cartItems = items.reduce((total, item) => item.quantity + total, 0);
  
  const deleteFromCartNotify= () => {
    toast.success("Successfully Removed .", {
      position:"top-right",
      autoClose: 3000, // time in milliseconds
    });
  };
  const quantityFromCartNotify= () => {
    toast.success("Successfully Changed Quantity .", {
      position:"top-right",
      autoClose: 3000, // time in milliseconds
    });
  };
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: + e.target.value }));
    quantityFromCartNotify()
  };
  const handleRemove = (e,id) => {
    dispatch(deleteItemFromCartAsync(id))
    deleteFromCartNotify();
  };

  return (
    <>
    {!items.length && <Navigate to='/' replace={true}></Navigate>}
    <div className="bg-white mt-10 mx-auto max-w-5xl px-4  sm:px-6 lg:px-8">
      <div className="mt-8 px-4 py-6 sm:px-6">
        <h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.href}>{item.title}</a>
                      </h3>
                      <p className="ml-4">${item.price}/-</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.brand || item.tags}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline text-sm/6 font-medium text-gray-900"
                      >
                        Qty
                      </label>
                      <select
                        onChange={(e) => handleQuantity(e, item) }
                        value={item.quantity}
                        className="rounded-md mx-2 py-1 text-slate-800"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                      onClick={e=>handleRemove(e,item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 my-2 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total items in the cart</p>
          <p>{cartItems} items</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to="/">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
