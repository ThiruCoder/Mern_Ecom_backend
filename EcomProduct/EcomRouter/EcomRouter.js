import express from 'express';
import { getProducts, getProductsById, createProduct, updateProduct, deleteProduct } from './ProductFunction.js';
import { getCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } from './CategoryFunction.js';
import { getAddCarts, getAddCartById, createAddCart, updateAddCartById, deleteAddCartById } from './AddCartFunction.js';
const ecom_router = express.Router();

ecom_router.get('/getProducts', getProducts);
ecom_router.post('/getProductsById/:id', getProductsById);
ecom_router.post('/createProduct', createProduct);
ecom_router.put('/updateProductById/:id', updateProduct);
ecom_router.delete('/deleteProductById/:id', deleteProduct);

ecom_router.get('/getCategories', getCategories);
ecom_router.post('/getCategoryById/:id', getCategoryById);
ecom_router.post('/createCategory', createCategory);
ecom_router.put('/updateCategoryById/:id', updateCategoryById);
ecom_router.delete('/deleteCategoryById/:id', deleteCategoryById);

ecom_router.get('/getAddCarts', getAddCarts);
ecom_router.post('/getAddCartById/:id', getAddCartById);
ecom_router.post('/createAddCart', createAddCart);
ecom_router.put('/updateAddCartById/:id', updateAddCartById);
ecom_router.delete('/deleteAddCartById/:id', deleteAddCartById);

export { ecom_router };

