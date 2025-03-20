import MainNavbar from "@/components/MainNavbar";
import ProductDetail from "@/components/ProductDetail"
import { productDetails } from '@/data/productDetails';
export default function ProductDetails(){
    return (
        <>
            <ProductDetail product = {productDetails}/>
        </>
    )
}