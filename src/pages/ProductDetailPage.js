import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product-list/components/ProductDetails";


function ProductDetailPage() {
    return ( 
        <Navbar title="Product Details">
            <ProductDetails></ProductDetails>            
        </Navbar>
     );
}

export default ProductDetailPage;