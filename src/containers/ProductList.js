import React from 'react';
import { useSelector } from 'react-redux';
import ProductComponent from './ProductComponent';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';

const ProductList = () => {
   const products = useSelector((state) => state);
   const dispatch = useDispatch();
   const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products')
         .catch((err) => {
            console.log('err', err)
         });
      dispatch(setProducts(response.data))
   }
   useEffect(() => {
      fetchProducts();
   }, [])

   console.log('Product:',products)
   return (
      <div className='product-list'>
         <ProductComponent />
      </div>
   )
}

export default ProductList