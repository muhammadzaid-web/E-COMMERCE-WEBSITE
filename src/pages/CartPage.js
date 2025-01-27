import Cart from '../features/Cart/Cart';
import Navbar from '../features/navbar/Navbar';

function CartPage() {
    return ( 
        <div>
            <Navbar title='Cart'>
            <Cart/>
            </Navbar>
        </div>
     );
}

export default CartPage;