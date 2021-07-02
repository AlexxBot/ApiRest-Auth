import product  from '../models/product';

export const createProduct = async (req, res) => {
    //console.dir(req.body)
    //objeto = req.body;
    const { name, category, price, imgURL } = req.body;
    //const newProduct = new product({name: name, category: category, price: price, imgURL: imgURL});
    const newProduct = new product({name, category, price, imgURL});
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
    //res.json(req.body)
};

export const getProducts = async (req, res) => {
    const products = await product.find();
    res.status(200).json(products);
};

export const getProductById = async (req, res) => {
    const productUpdated = await product.findById(req.params.productId);
    res.status(200).json(productUpdated);

};

export const updateProductById = async (req, res) => {
const updatedProduct = await product.findByIdAndUpdate(req.params.productId, req.body, 
{
    new: true// esto es para obtner los nuevos datos actulaizados, si esta en falso te delvuelve el anterior
})
res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await product.findByIdAndDelete(productId);
    //console.dir(deletedProduct)
    res.status(204).json();
};