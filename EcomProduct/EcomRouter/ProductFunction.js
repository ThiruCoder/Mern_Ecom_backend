import { ProductModel } from "../Product_Schema.js";


// Get products from the database
const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
    }
}


// Get product by ID
const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Product Id is required', success: false })
        }
        const product = await ProductModel.findById(id)
        if (product) {
            return res.status(200).json({ data: product, message: 'Product fetched successfully', success: true });
        } else {
            return res.status(404).json({ message: "Product not found", success: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
    }
};


// Create a new product
const createProduct = async (req, res) => {
    const data = req.body;

    try {

        // const newProduct = await ProductModel.insertMany(data);


        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });

    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    const { id } = req.body;
    const { name, price } = req.body;
    const product = ProductModel.find((p) => p.id === parseInt(id));
    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.body;
    const productIndex = ProductModel.findIndex((p) => p.id === parseInt(id));
    if (productIndex !== -1) {
        ProductModel.splice(productIndex, 1);
        res.status(200).json({ message: "Product deleted successfully" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

export { getProducts, getProductsById, createProduct, updateProduct, deleteProduct }