import Navbar from "../features/navbar/Navbar";
import AdminProductDetails from "../features/admin/components/AdminProductDetails";


function AdminProductDetailPage() {
    return ( 
        <Navbar title="Admin Product Details">
            <AdminProductDetails></AdminProductDetails>            
        </Navbar>
     );
}

export default AdminProductDetailPage;
