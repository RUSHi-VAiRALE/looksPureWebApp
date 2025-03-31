import MainNavbar from "@/components/MainNavbar";
import ProductDetail from "@/components/ProductDetail"
import { productDetails } from '@/data/productDetails';
import Announcement from "@/components/Announcement";
export default function ProductDetails(){
    return (
        <>
            <ProductDetail product = {productDetails}/>
        </>
    )
}