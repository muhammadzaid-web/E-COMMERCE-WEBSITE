import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Checkout from './pages/Checkout';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element:(<Home/>)
  },
  {
    path:'/login',
    element:(<LoginPage/>)
  },
  {
    path:'/signup',
    element:(<SignupPage/>)
  },
  {
    path:'/cart',
    element:(<CartPage/>)
  },
  {
    path:'/checkout',
    element:(<Checkout/>)
  },
  {
    path:'/product-detail/:id',
    element:(<ProductDetailPage/>)
  }
])

function App() {
  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
