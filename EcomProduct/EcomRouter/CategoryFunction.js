import { CategoryModel } from "../Category_Schema.js";


// Get products from the database
const getCategories = async (req, res) => {
    try {
        const products = await CategoryModel.find({});
        if (!products || products.length === 0) {
            return res.status(404).json({
                message: "No products found",
                success: false
            });
        }
        res.status(200).json({
            data: products,
            message: 'Products fetched successfully',
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
    }
}


// Get product by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await CategoryModel.find((p) => p.id === parseInt(id));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false
        });
    }
};


// Create a new product
const createCategory = async (req, res) => {
    // const { name, price } = req.body;

    try {

        // const newProduct = await CategoryModel.insertMany(data);

        // res.status(201).json(newProduct);
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
const updateCategoryById = async (req, res) => {
    const { id } = req.body;
    const { name, price } = req.body;
    const product = CategoryModel.find((p) => p.id === parseInt(id));
    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

// Delete a product
const deleteCategoryById = async (req, res) => {
    const { id } = req.body;
    const productIndex = CategoryModel.findIndex((p) => p.id === parseInt(id));
    if (productIndex !== -1) {
        CategoryModel.splice(productIndex, 1);
        res.status(200).json({ message: "Product deleted successfully" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
};

export { getCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById };