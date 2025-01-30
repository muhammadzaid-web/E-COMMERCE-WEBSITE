import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProduct,
} from "../../product-list/ProductListSlice";
import { useParams } from "react-router-dom";
import { fetchProductByIdAsync } from "../../product-list/ProductListSlice";
import { addToCartAsync } from "../../Cart/CartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
// import { ToastContainer,toast } from "react-toastify";
import { toast } from "react-toastify";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductDetails() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const product = useSelector(selectProduct);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const params = useParams();
  // const addToCartNotify =()=>toast("Successfully Added To Cart")


  const addToCartNotify = () => {
    toast.success(" Success! Operation completed.", {
      position:"top-right",
      autoClose: 3000, // time in milliseconds
    });
  };
  const handleCart = (e) => {
    e.preventDefault();
    const newItem ={...product, quantity:1,user:user.id}
    delete newItem['id']
    dispatch(addToCartAsync(newItem))
    addToCartNotify();
    // alert("Successfully added to cart")
  };

  useEffect(
    () => {
      dispatch(fetchProductByIdAsync(params.id));
    },
    [dispatch, params.id]
  );

  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        fill="currentColor"
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <div aria-current="page">
                  <h2 className="font-medium text-2xl text-gray-800 flex gap-2 items-end">
                    {product.title}
                  </h2>
                  <p className="hide lg:text-gray-600 lg:text-md">
                    presented by{" "}
                    <span className="lg:text-3xl text-2xl text-cyan-400 lg:text-md">
                      {product.brand}
                    </span>
                  </p>
                </div>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <img
              alt={product.title}
              src={product.images[0]}
              className="hidden size-full bg-gray-200 hover:scale-105 transition-all rounded-lg object-cover lg:block"
            />
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <img
                alt={product.title}
                src={product.thumbnail}
                className="aspect-[3/2]  bg-gray-200 w-full hover:scale-105 transition-all rounded-lg object-cover"
              />
              <img
                alt={product.title}
                src={product.thumbnail}
                className="aspect-[3/2]  bg-gray-200 w-full hover:scale-105 transition-all rounded-lg object-cover"
              />
            </div>
            <img
              alt={product.title}
              src={product.images[0]}
              className="aspect-[4/5]  bg-gray-200 size-full hover:scale-105 transition-all object-cover sm:rounded-lg lg:aspect-auto"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}/-
              </p>
              <div>
                <span className="text-lg line-through font-medium text-gray-500">
                  $
                  {Math.round(
                    product.price +
                      (product.price * product.discountPercentage) / 100
                  )}
                  /-
                </span>
                <span className="text-blue-800 mx-2 px-4 py-1 bg-cyan-200 rounded font-bold text-md">
                  {Math.round(product.discountPercentage)} % off{" "}
                </span>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div>
                  <div className="flex items-center text-yellow-500">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating > rating
                            ? "text-yellow-500 "
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm block">
                    {product.rating} out of 5 stars
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <h2 className="p-2 text-md font-bold">Tags</h2>

                {product.tags[0] && <p className="p-2 text-sm text-white transition-all drop-shadow-md hover:bg-red-500 bg-red-200 rounded-full">
                  {product.tags[0]}
                </p>}
                {product.tags[1] && <p className="p-2 text-sm text-white transition-all drop-shadow-md hover:bg-green-500 bg-green-200 rounded-full">
                  {product.tags[1]}
                </p>}
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center gap-x-3"
                    >
                      {colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "size-8 rounded-full border border-black/10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Dimensions
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {Object.entries(product.dimensions).map(([key, value]) => (
                      <li key={key} className="text-gray-400">
                        <span className="text-gray-600 capitalize">
                          {key}: {value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
