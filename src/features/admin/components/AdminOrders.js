// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllOrdersAsync,
//   fetchUpdateOrderAsync,
//   selectOrders,
//   selectTotalOrders,
// } from "../../order/OrderSlice";
// import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// function AdminOrders() {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);
//   const totalOrders = useSelector(selectTotalOrders);
//   const [editableOrderId, setEditableOrderId] = useState(-1);
//   const [showDetails, setShowDetails] = useState(false);

//   console.log(orders);
//   console.log(totalOrders);

//   useEffect(() => {
//     dispatch(fetchAllOrdersAsync());
//   }, [dispatch]);

//   function handleShow() {
//     setShowDetails(true)
//     setTimeout(() => {
//         setShowDetails(false); // Change the state after 6 seconds
//       }, 6000);
// }
// function handleEdit(order) {
//     // console.log(order);
//     setEditableOrderId(order.id);

//   }
//   function handleUpdate(e, order) {
//     // console.log(e.target.value,order);
//     const updatedOrder = { ...order, status: e.target.value };
//     dispatch(fetchUpdateOrderAsync(updatedOrder));
//     setEditableOrderId(-1)
//   }

//   return (
//     <>
//       {/* component */}
//       <div className="overflow-x-auto">
//         <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
//           <div className="w-full ">
//             <div className="bg-white shadow-md rounded my-6">
//               <table className="min-w-max w-full table-auto ">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                     <th className="py-3 px-6 text-left">Order Number</th>
//                     <th className="py-3 px-6 text-left">Items</th>
//                     <th className="py-3 px-6 text-center">Total Amount</th>
//                     <th className="py-3 px-6 text-center">Shipping Address</th>
//                     <th className="py-3 px-6 text-center">Status</th>
//                     <th className="py-3 px-6 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-600 text-sm font-light">
//                   {orders.map((order) => (
//                     <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
//                       <td className="py-3 px-6 text-left">
//                         <h2 className="text-gray-700 font-bold">#{order.id}</h2>
//                       </td>
//                       <td className="py-2 px-6 text-left">
//                         <div className="flex flex-col items-start">
//                           {order.items.map((item) => (
//                             <div className="flex items-end gap-1">
//                               <img
//                                 className="w-8 h-8 rounded-full rounded-br-none bg-indigo-300 p-[.02rem] border border-gray-200 hover:scale-125"
//                                 src={item.thumbnail}
//                               />{" "}
//                               <span className="text-sm font-semibold">
//                                 {item.title}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-center text-grey-700 font-semibold">
//                         <div className="">
//                           {order.items.map((item) => (
//                             <p>
//                               ${" "}
//                               {item.quantity*(Math.round(
//                                 item.price *
//                                   (1 - item.discountPercentage / 100),
//                                 2
//                               ))}
//                             </p>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-center text-grey-700 font-normal">
//                         <p className="font-semibold">
//                           {order.selectedAddress.name}
//                         </p>
//                         <p>{order.selectedAddress.street}</p>
//                         <p>
//                           {order.selectedAddress.city}(
//                           {order.selectedAddress.pinCode})
//                         </p>
//                         <p>📞 {order.selectedAddress.phone}</p>
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         {order.id !== editableOrderId ? <span
//                           className={` ${
//                             order.status === "cancelled"
//                               ? "bg-red-200 text-red-600"
//                               : order.status === "delivered"
//                               ? "text-green-600 bg-green-200"
//                               : order.status === "dispatched"
//                               ? "text-yellow-600 bg-yellow-200"
//                               : "text-indigo-600 bg-indigo-200"
//                           } font-semibold py-1 px-3 rounded-full text-xs`}
//                         >
//                           {order.status === "delivered"
//                             ? "✔"
//                             : order.status === "cancelled"
//                             ? "❌"
//                             : order.status === 'dispatched'
//                             ? "🚛"
//                             : "🕙"}
//                           {order.status}
//                         </span> :
//                         <select onChange={(e) => handleUpdate(e, order)} className="rounded-3xl h-8 w-26 text-xs py-0 focus:outline-none focus:ring-2 focus:ring-indigo-500">
//                           <option >Select</option>
//                           <option value="pending">Pending</option>
//                           <option value="dispatched">Dispatched</option>
//                           <option value="delivered">Delivered</option>
//                           <option value="cancelled">Cancelled</option>
//                         </select> }
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         <div className="flex ">
//                           <div className={`${showDetails ? "visible" : "hidden"} min-w-20 min-h-18 py-4 border bg-slate-500`}>
//                             <p>{order.selectedAddress.name}</p>
//                             <p>{order.selectedAddress.email}</p>
//                             <p>{order.selectedAddress.street}</p>
//                             <p>{order.selectedAddress.city}{order.selectedAddress.pinCode}</p>
//                             <p>{order.selectedAddress.state}</p>
//                           </div>
//                           <div className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
//                             <EyeIcon
//                               onClick={handleShow}
//                             ></EyeIcon>
//                           </div>
//                           <div className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
//                             <PencilIcon
//                               onClick={(e) => handleEdit(order)}
//                             ></PencilIcon>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminOrders;







// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllOrdersAsync,
//   fetchUpdateOrderAsync,
//   selectOrders,
//   selectTotalOrders,
// } from "../../order/OrderSlice";
// import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// function AdminOrders() {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);
//   const totalOrders = useSelector(selectTotalOrders);
//   const [editableOrderId, setEditableOrderId] = useState(-1);
//   const [showOrderId, setShowOrderId] = useState(null); // Track which order's details are shown

//   console.log(orders);
//   console.log(totalOrders);

//   useEffect(() => {
//     dispatch(fetchAllOrdersAsync());
//   }, [dispatch]);

//   // Function to show details of a specific order
//   function handleShow(orderId) {
//     setShowOrderId(orderId); // Show details for the clicked order
//     setTimeout(() => {
//       setShowOrderId(null); // Hide details after 6 seconds
//     }, 6000);
//   }

//   function handleEdit(order) {
//     setEditableOrderId(order.id);
//   }

//   function handleUpdate(e, order) {
//     const updatedOrder = { ...order, status: e.target.value };
//     dispatch(fetchUpdateOrderAsync(updatedOrder));
//     setEditableOrderId(-1);
//   }

//   return (
//     <>
//       <div className="overflow-x-auto">
//         <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
//           <div className="w-full">
//             <div className="bg-white shadow-md rounded my-6">
//               <table className="min-w-max w-full table-auto">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                     <th className="py-3 px-6 text-left">Order Number</th>
//                     <th className="py-3 px-6 text-left">Items</th>
//                     <th className="py-3 px-6 text-center">Total Amount</th>
//                     <th className="py-3 px-6 text-center">Shipping Address</th>
//                     <th className="py-3 px-6 text-center">Status</th>
//                     <th className="py-3 px-6 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-600 text-sm font-light">
//                   {orders.map((order) => (
//                     <tr
//                       key={order.id}
//                       className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
//                     >
//                       <td className="py-3 px-6 text-left">
//                         <h2 className="text-gray-700 font-bold">#{order.id}</h2>
//                       </td>
//                       <td className="py-2 px-6 text-left">
//                         <div className="flex flex-col items-start">
//                           {order.items.map((item) => (
//                             <div key={item.id} className="flex items-end gap-1">
//                               <img
//                                 className="w-8 h-8 rounded-full rounded-br-none bg-indigo-300 p-[.02rem] border border-gray-200 hover:scale-125"
//                                 src={item.thumbnail}
//                               />
//                               <span className="text-sm font-semibold">
//                                 {item.title}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-center text-grey-700 font-semibold">
//                         <div className="">
//                           {order.items.map((item) => (
//                             <p key={item.id}>
//                               ${" "}
//                               {item.quantity *
//                                 Math.round(
//                                   item.price *
//                                     (1 - item.discountPercentage / 100),
//                                   2
//                                 )}
//                             </p>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="py-3 px-6 text-center text-grey-700 font-normal">
//                         <p className="font-semibold">
//                           {order.selectedAddress.name}
//                         </p>
//                         <p>{order.selectedAddress.street}</p>
//                         <p>
//                           {order.selectedAddress.city}(
//                           {order.selectedAddress.pinCode})
//                         </p>
//                         <p>📞 {order.selectedAddress.phone}</p>
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         {order.id !== editableOrderId ? (
//                           <span
//                             className={`${
//                               order.status === "cancelled"
//                                 ? "bg-red-200 text-red-600"
//                                 : order.status === "delivered"
//                                 ? "text-green-600 bg-green-200"
//                                 : order.status === "dispatched"
//                                 ? "text-yellow-600 bg-yellow-200"
//                                 : "text-indigo-600 bg-indigo-200"
//                             } font-semibold py-1 px-3 rounded-full text-xs`}
//                           >
//                             {order.status === "delivered"
//                               ? "✔"
//                               : order.status === "cancelled"
//                               ? "❌"
//                               : order.status === "dispatched"
//                               ? "🚛"
//                               : "🕙"}
//                             {order.status}
//                           </span>
//                         ) : (
//                           <select
//                             onChange={(e) => handleUpdate(e, order)}
//                             className="rounded-3xl h-8 w-26 text-xs py-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                           >
//                             <option>Select</option>
//                             <option value="pending">Pending</option>
//                             <option value="dispatched">Dispatched</option>
//                             <option value="delivered">Delivered</option>
//                             <option value="cancelled">Cancelled</option>
//                           </select>
//                         )}
//                       </td>
//                       <td className="py-3 px-6 text-center">
//                         <div className="flex">
//                           {/* Show details only for the clicked order */}
//                           {showOrderId === order.id && (
//                             <div className="min-w-20 min-h-18 py-4 border bg-slate-500">
//                               <p>{order.selectedAddress.name}</p>
//                               <p>{order.selectedAddress.email}</p>
//                               <p>{order.selectedAddress.street}</p>
//                               <p>
//                                 {order.selectedAddress.city}
//                                 {order.selectedAddress.pinCode}
//                               </p>
//                               <p>{order.selectedAddress.state}</p>
//                             </div>
//                           )}
//                           <div className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
//                             <EyeIcon
//                               onClick={() => handleShow(order.id)} // Pass the order ID
//                             />
//                           </div>
//                           <div className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
//                             <PencilIcon onClick={() => handleEdit(order)} />
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminOrders;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  fetchUpdateOrderAsync,
  selectOrders,
  selectTotalOrders,
} from "../../order/OrderSlice";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [showOrderId, setShowOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, [dispatch]);

  function handleShow(orderId) {
    setShowOrderId(orderId);
    setTimeout(() => {
      setShowOrderId(null);
    }, 6000);
  }

  function handleEdit(order) {
    setEditableOrderId(order.id);
  }

  function handleUpdate(e, order) {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(fetchUpdateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order Number</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left font-bold">#{order.id}</td>
                      <td className="py-2 px-6 text-left">
                        <div className="flex flex-col items-start">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-end gap-1">
                              <img className="w-8 h-8 rounded-full bg-indigo-300 p-[.02rem] border border-gray-200 hover:scale-125" src={item.thumbnail} />
                              <span className="text-sm font-semibold">{item.title}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center text-grey-700 font-semibold">
                        {order.items.map((item) => (
                          <p key={item.id}>${item.quantity * Math.round(item.price * (1 - item.discountPercentage / 100), 2)}</p>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center font-normal">
                        <p className="font-semibold">{order.selectedAddress.name}</p>
                        <p>{order.selectedAddress.city} ({order.selectedAddress.pinCode})</p>
                        <p>📞 {order.selectedAddress.phone}</p>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id !== editableOrderId ? (
                          <span className={`py-1 px-3 rounded-full text-xs ${order.status === "cancelled" ? "bg-red-200 text-red-600" : order.status === "delivered" ? "text-green-600 bg-green-200" : order.status === "dispatched" ? "text-yellow-600 bg-yellow-200" : "text-indigo-600 bg-indigo-200"}`}>{order.status}</span>
                        ) : (
                          <select onChange={(e) => handleUpdate(e, order)} className="rounded-3xl h-8 w-26 text-xs py-0 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>Select</option>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center relative">
                        {showOrderId === order.id && (
                          <div className="absolute -top-4 -left-20 transform -translate-x-1/2 bg-white shadow-lg p-2 rounded-lg transition-opacity duration-300 opacity-100 min-w-52 text-left">
                            <p className="font-semibold">NAME: {order.selectedAddress.name}</p>
                            <p>EMAIL: {order.selectedAddress.email}</p>
                            <p>{order.selectedAddress.street}</p>
                            <p>{order.selectedAddress.city} ({order.selectedAddress.pinCode})</p>
                            <p>{order.selectedAddress.state}</p>
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <EyeIcon onClick={() => handleShow(order.id)} className="cursor-pointer hover:text-purple-500 transform hover:scale-110" />
                          <PencilIcon onClick={() => handleEdit(order)} className="cursor-pointer hover:text-purple-500 transform hover:scale-110" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
