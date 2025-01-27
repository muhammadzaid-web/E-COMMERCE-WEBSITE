import { Link } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../features/navbar/Navbar";
import {
  deleteItemFromCartAsync,
  selectItem,
  updateCartAsync,
} from "../features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/order/OrderSlice";
import { selectTotalItems } from "../features/product-list/ProductListSlice";
import { selectUserInfo } from "../features/user/UserSlice";

function Checkout() {
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItem);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const totalAmount = Math.round(
    items.reduce((amount, item) => item.price * item.quantity + amount, 0)
  );
  const cartItems = items.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    console.log("Selected Address: ", selectedAddress);
    console.log("Payment Method Updated:", selectedPayment);
  }, [selectedPayment, selectedAddress]);

  const deleteFromCartNotify = () => {
    toast.success("Successfully Removed .", {
      position: "top-right",
      autoClose: 3000, // time in milliseconds
    });
  };
  const quantityFromCartNotify = () => {
    toast.success("Successfully Changed Quantity .", {
      position: "top-right",
      autoClose: 3000, // time in milliseconds
    });
  };
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
    quantityFromCartNotify();
  };
  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
    deleteFromCartNotify();
  };

  const handleAddress = (e) => {
    const index = e.target.value; // Get the selected index
    setSelectedAddress(user.addresses[index]); // Update the state
  };

  const handlePayment = (e) => {
    setSelectedPayment(e.target.value); // Update payment method
  };

  const handleOrder = (e) => {
    if(selectedAddress && selectedPayment){
    const order = {
      items,
      totalAmount,
      cartItems,
      user,
      selectedAddress,
      selectedPayment,
      status:'pending',
    };
    dispatch(createOrderAsync(order));
    toast.success(" Order Successfully Placed ",{
      position:"top-center",
      autoclose:2500,
    })
    }else{
      toast.warning("Enter Your Address & Payment Method", {
        position: "top-center",
        autoClose: 2500, // time in milliseconds
      });
    }
  };

  return (
    <Navbar title='Checkout'>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
      <div className="mx-auto my-6 max-w-7xl sm:px-6 lg:px-4">
        <div className="lg:px-20 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 shadow-md mt-10">
            <form
              className="bg-white rounded-md p-4"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-4xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:px-4 lg:px-2">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", {
                            required: "name is required",
                          })}
                          type="text"
                          placeholder="Enter Your Full Name Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4 lg:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          placeholder="Enter Your Email Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4 lg:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone No.
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="phone"
                          placeholder="Enter Your Phone No. Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", {
                            required: "street is required",
                          })}
                          type="text"
                          placeholder="Enter Your Street Address Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "city is required",
                          })}
                          type="text"
                          placeholder="Enter Your City Name Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", {
                            required: "state is required",
                          })}
                          type="text"
                          placeholder="Enter Your State Name Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Pin code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          type="text"
                          placeholder="Enter Your Pin-Code Here..."
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm/6 font-semibold text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Address
                  </h2>
                  {user.addresses ? (
                    <p className="mt-1 text-sm/6 text-gray-600">
                      Choose from existing address
                    </p>
                  ) : (
                    <p className="mt-1 text-sm/6 text-gray-600">
                      ----empty!----{" "}
                    </p>
                  )}
                  <div className="mt-10 space-y-10">
                    {/* Address Selection */}
                    {user.addresses && (
                      <ul role="list" className="divide-y divide-gray-100">
                        {user.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between gap-x-6 py-5"
                          >
                            <label
                              htmlFor={`add-${index}`}
                              className="flex items-center gap-x-4"
                            >
                              <input
                                id={`add-${index}`}
                                name="address"
                                value={index} // Pass index as value
                                onChange={handleAddress}
                                checked={selectedAddress === address} // Match with selectedAddress
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-xs text-gray-500">
                                  Phone: {address.phone || "N/A"}
                                </p>
                                <p className="mt-1 truncate text-xs text-gray-500">
                                  Email: {address.email || "N/A"}
                                </p>
                              </div>
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Payment Methods */}
                    <fieldset>
                      <legend className="text-sm font-semibold text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm text-gray-600">
                        Choose one of them
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            value="cash"
                            onChange={handlePayment}
                            checked={selectedPayment === "cash"}
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Cash Payment
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            value="card"
                            onChange={handlePayment}
                            checked={selectedPayment === "card"}
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 ">
            <div className="bg-white rounded-md shadow-md mt-10 mx-auto max-w-5xl sm:px-6 lg:px-0">
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
                            <div className="flex justify-between text-sm xl:text-base font-medium text-gray-900">
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
                                onChange={(e) => handleQuantity(e, item)}
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
                                onClick={(e) => handleRemove(e, item.id)}
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

              <div className="border-t border-gray-200 my-4 mx-2 px-0 py-6 md:px-6">
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
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay & Order
                  </div>
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
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Checkout;
