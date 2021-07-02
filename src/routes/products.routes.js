import { Router } from 'express';
const router = Router()


//import { createProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../controllers/products.controller';

import * as productController from '../controllers/products.controller'; 

import { authJwt } from '../middlewares/index';

/* router.get('/', (req, res, next) => {
    res.json("get products")
})
 */

router.get('/', productController.getProducts)
router.post('/', [authJwt.verifyToken], productController.createProduct)
router.get('/:productId', productController.getProductById)
router.put('/:productId',[authJwt.verifyToken], productController.updateProductById)
router.delete('/:productId',[authJwt.verifyToken], productController.deleteProductById)

export default router;