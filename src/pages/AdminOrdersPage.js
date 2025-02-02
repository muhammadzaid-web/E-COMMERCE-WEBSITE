import AdminOrders from '../features/admin/components/AdminOrders';
import Navbar from '../features/navbar/Navbar'

function AdminOrdersPage() {
    return ( 
        <Navbar title='Orders-Panel'>
            <AdminOrders></AdminOrders>
        </Navbar>
     );
}

export default AdminOrdersPage;