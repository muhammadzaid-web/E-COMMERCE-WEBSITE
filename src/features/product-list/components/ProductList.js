import React, { useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, Fragment } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProduct,
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectCategories,
  selectBrands,
  fetchCategoriesAsync,
  fetchBrandsAsync,
  selectTotalItems,
} from "../ProductListSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc" },
  { name: "Price: Low to High", sort: "price", order: "asc" },
  { name: "Price: High to Low", sort: "price", order: "desc" },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProduct);
  const totalItems = useSelector(selectTotalItems);
  const category = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: category
    },
    {
      id: "brand",
      name: "Brand",
      options: brands
    },
  ];

  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    const newFilter = {...filter};
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
    console.log(section.id, option.value);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log(sort);
    setSort(sort);
  };

  const handlePage = (page) => {
    if(page == Number){
      setPage(page);
    }
    console.log({page});
    return;
  };

  useEffect(() => {
    const pagination ={_page:page,_limit:ITEMS_PER_PAGE}
    dispatch(fetchProductsByFiltersAsync({filter,sort,pagination}));
  }, [dispatch,filter,sort,page]);

  useEffect(()=>{
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  },[dispatch])

  useEffect(()=>{
    setPage(1)
  },[totalItems,sort])

  return (
    <div className="bg-white">
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            handleFilter={handleFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleSort={handleSort}
            filters={filters}>
            </MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <p
                            onClick={(e) => handleSort(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            )}
                          >
                            {option.name}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter filters={filters} handleFilter={handleFilter}></DesktopFilter>

                {/* Product grid */}
                <div className="lg:col-span-3 border-t border-gray-200">
                  {/* Your content */}
                  <ProductGrid products={products}></ProductGrid>
                </div>
                {/* product grid end */}
              </div>
            </section>
            {/* prdouct filters and product card end here */}

            <Pagination handlePage={handlePage} page={page} setPage={setPage}></Pagination>
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  filters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  handleSort
}) {
  return (
    <>
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-[open]:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                defaultValue={option.value}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                onClick={(e) =>
                                  handleFilter(e, section, option)
                                }
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function DesktopFilter({ handleFilter , filters}) {
  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section) => (
          <Disclosure
            key={section.id}
            as="div"
            className="border-b border-gray-200 py-6"
          >
            <h3 className="-my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="size-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="size-5 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex gap-3">
                    <div className="flex h-5 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          defaultValue={option.value}
                          defaultChecked={option.checked}
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          onClick={(e) => handleFilter(e, section, option)}
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </form>
    </>
  );
}

function ProductGrid({products}) {
  return <>
    <div className="mx-auto max-w-2xl px-4 lg:pt-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
                    <div className=" grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                      {products.map((product) => (
                        <Link to={`/product-detail/${product.id}`}>
                          <div
                            key={product.id}
                            className="group border border-gray-300 relative transition-all p-2 hover:scale-105 hover:shadow-md hover:shadow-sky-200 rounded-lg"
                          >
                            <img
                              alt={product.imageAlt}
                              src={product.thumbnail}
                              className="aspect-square w-full rounded-md border border-gray-300 bg-gray-200 drop-shadow object-cover group-hover:opacity-75 group-hover:bg-blue-200 lg:aspect-auto lg:h-60"
                            />
                            <div className="mt-4 flex px-2 justify-between">
                              <div>
                                <h3 className="text-sm font-semibold text-gray-700">
                                  {product.title}
                                </h3>
                                <p className="mt-1 py-4 text-sm align-bottom flex gap-1">
                                  <span className="text-gray-600">
                                    Rating:{" "}
                                  </span>
                                  {product.rating || "N/A"}
                                  <StarIcon className="w-3 align-bottom text-yellow-500 inline" />
                                </p>
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                <p className="text-sm font-medium text-gray-900">
                                  $
                                  {Math.round(
                                    product.price -
                                      (product.price *
                                        product.discountPercentage) /
                                        100
                                  )}
                                  /-
                                </p>
                                <span className="line-through text-xs">
                                  ${product.price}/-
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
  </>;
}

function Pagination({handlePage,page ,setPage, totalItems=100}) {
  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={(e)=>page>1 ? setPage(page-1) : Popover}
            className="relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={(e)=>page<10?setPage(page+1): Popover}
            className="relative cursor-pointer ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <div
                onClick={(e)=>page>1 ? setPage(page-1) : Popover}
                className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              
              {Array.from({ length: Math.ceil(totalItems/ITEMS_PER_PAGE) }).map((index)=>
                <div
                onClick={(e)=>handlePage(index+1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center border border-gray-300 ${index+1===page?'bg-indigo-600 text-white':'bg-white text-gray-600 focus-visible:outline-indigo-600'} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
              >
                {index+1}
              </div>
              )}
              
              
              
              {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span> */}

              <div
                onClick={(e)=>page<10 ? setPage(page+1) : Popover}
                className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
