import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { useState } from "react";
import Navbar from "../features/navbar/Navbar";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
const addresses = [
  {
    name: "Leslie Alexander",
    street: "123 Main St",
    city: "New York",
    pinCode: "10001",
    state: "NY",
    phoneNo: "123-456-7890",
    email: "leslie.alexander@example.com",
  },
  {
    name: "Michael Foster",
    street: "456 Elm St",
    city: "Los Angeles",
    pinCode: "90001",
    state: "CA",
    phoneNo: "234-567-8901",
    email: "michael.foster@example.com",
  },
  {
    name: "Dries Vincent",
    street: "789 Oak St",
    city: "Chicago",
    pinCode: "60601",
    state: "IL",
    phoneNo: "345-678-9012",
    email: "dries.vincent@example.com",
  },
  {
    name: "Lindsay Walton",
    street: "101 Pine St",
    city: "Houston",
    pinCode: "77001",
    state: "TX",
    phoneNo: "456-789-0123",
    email: "lindsay.walton@example.com",
  },
  {
    name: "Courtney Henry",
    street: "202 Maple St",
    city: "Phoenix",
    pinCode: "85001",
    state: "AZ",
    phoneNo: "567-890-1234",
    email: "courtney.henry@example.com",
  },
  {
    name: "Tom Cook",
    street: "303 Cedar St",
    city: "Seattle",
    pinCode: "98101",
    state: "WA",
    phoneNo: "678-901-2345",
    email: "tom.cook@example.com",
  },
];

function Checkout() {
  const [open, setOpen] = useState(true);

  return (
    <Navbar>
      <div className="mx-auto my-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:px-20 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3 mt-10">
          <form className="bg-white p-4">
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-4xl font-bold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
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
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
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
                <p className="mt-1 text-sm/6 text-gray-600">
                  CHoose from existing address
                </p>

                <div className="mt-10 space-y-10">
                  <ul role="list" className="divide-y divide-gray-100">
                    {addresses.map((address, index) => (
                      <li
                        key={address.email}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <label
                          htmlFor={`add-${index}`}
                          className="flex items-center gap-x-4"
                        >
                          <input
                            id={`add-${index}`}
                            name="address-selection"
                            type="radio"
                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm/2 font-semibold text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs/4 text-gray-500">
                              Phone: {address.phoneNo || "N/A"}
                            </p>
                            <p className="mt-1 truncate text-xs/4 text-gray-500">
                              Email: {address.email || "N/A"}
                            </p>
                          </div>
                        </label>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="mt-1 text-end text-xs/4 text-gray-600">
                            {address.city || "N/A"}
                            <br />
                            {address.state || "N/A"}
                            <br />
                            {address.pinCode || "N/A"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm/6 text-gray-600">
                      Choose one of them
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          defaultChecked
                          id="push-cash"
                          name="payments"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label
                          htmlFor="push-cash"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Cash Payment
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-card"
                          name="payments"
                          type="radio"
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                        <label
                          htmlFor="push-card"
                          className="block text-sm/6 font-medium text-gray-900"
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

        <div className="lg:col-span-2">
          <div className="bg-white my-10 mx-auto max-w-5xl lg:px-2 sm:px-6 px-4 ">
            <div className="mt-8  py-6 sm:px-6">
              <h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={product.imageAlt}
                          src={product.imageSrc}
                          className="size-full object-cover"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.name}</a>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
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
                              id="quantity"
                              className="rounded-md mx-2 text-slate-800"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
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

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/pay"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Pay & Order
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
                      {/* <span aria-hidden="true"> &rarr;</span> */}
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
