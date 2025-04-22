import e from "express";
import { AddCartModel } from "../AddCart_Schema.js";
import { ProductModel } from "../Product_Schema.js";


const getAddCarts = async (req, res) => {
    try {
        const carts = await AddCartModel.find({});
        if (!carts || carts.length === 0) {
            return res.status(404).json({
                message: "No carts found",
                success: false
            });
        }
        res.status(200).json({
            data: carts,
            message: 'Carts fetched successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
};

const getAddCartById = async (req, res) => {
    try {
        const { id } = req.params;
        // Logic to fetch a cart by ID
        const cart = {}; // Replace with actual data fetching logic
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch cart with ID: ${id}` });
    }
};

// Create a new cart
const createAddCart = async (req, res) => {
    try {
        const cartData = req.body;

        if (!cartData || !cartData._id) {
            return res.status(400).json({ message: 'Cart data or ID is required', success: false });
        }

        if (cartData?.name) {
            const existingCart = await AddCartModel.findOne({ name: cartData.name });
            if (existingCart) {
                try {
                    const updatedQuantity = existingCart.quantity + 1;
                    const updatedPrice = existingCart.price * updatedQuantity;
                    const updatedData = await AddCartModel.findByIdAndUpdate(
                        existingCart._id,
                        {
                            $set: {
                                quantity: updatedQuantity,
                                totalPrice: updatedPrice
                            },
                        },
                        { new: true }
                    );
                    return res.status(200).json({
                        data: updatedData,
                        message: 'Cart quantity is increased successfully',
                        success: true
                    });
                } catch (error) {
                    console.log('Error:', error);
                    return res.status(500).json({
                        message: 'Failed to update cart',
                        success: false
                    });

                }
            }
        }

        // If item doesn't exist, create new one
        const newCartData = await AddCartModel.create({
            ...cartData,
            quantity: 1,
            totalPrice: cartData.price
        });

        return res.status(201).json({
            data: newCartData,
            message: 'Cart created successfully',
            success: true,
        });

    } catch (error) {
        console.error('Error creating cart:', error);
        return res.status(500).json({
            error: 'Failed to create cart',
            success: false
        });
    }
};




const updateAddCartById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Cart Id is required', success: false });
        }
        const { quantity, totalPrice, name } = req.body;

        if (quantity === undefined || totalPrice === undefined || !name) {
            return res.status(400).json({ message: 'Quantity, totalPrice, and name are required', success: false });
        }


        const parsedQuantity = Number(quantity);
        const parsedTotalPrice = Number(totalPrice);

        if (isNaN(parsedQuantity) || isNaN(parsedTotalPrice)) {
            return res.status(400).json({
                message: 'Invalid quantity or totalPrice',
                success: false
            });
        }

        const updatedData = await AddCartModel.findOne({ id: name });
        const updatedProductQuantity = await ProductModel.findOne({ id: name })
        console.log('quantity', quantity, 'totalPrice', totalPrice, 'name', name);


        if (updatedData) {
            const updatedQuantity = updatedData.quantity + parsedQuantity;
            const updatedPrice = updatedData.totalPrice + parsedTotalPrice;
            console.log('updatedQuantity', updatedQuantity, updatedPrice);

            const updateDate = await AddCartModel.findByIdAndUpdate(updatedData._id, {
                $set: {
                    quantity: updatedQuantity,
                    totalPrice: updatedPrice,
                },
            }, { new: true });
            await ProductModel.findByIdAndUpdate(updatedProductQuantity._id, {
                $set: {
                    quantity: updatedQuantity,
                    totalPrice: updatedPrice,
                },
            }, { new: true });

            return res.status(200).json({

                message: 'Cart updated successfully',
                success: true
            });
        } else {
            const productsData = await ProductModel.findById(id);
            if (!productsData) {
                return res.status(404).json({
                    message: 'Product not found!',
                    success: false
                });
            }

            const productDataToAdd = productsData.toObject();
            delete productDataToAdd._id;
            delete productDataToAdd.__v;

            const updatedQuantity = parsedQuantity + parsedQuantity;
            const updatedPrice = parsedTotalPrice * updatedQuantity;

            const newCartData = await AddCartModel.create({
                ...productDataToAdd,
                name: name,
                quantity: updatedQuantity,
                totalPrice: updatedPrice
            });

            const product = await ProductModel.findById(id);
            if (!product) {
                console.log("Product not found with that ID.");
            } else {
                await ProductModel.findByIdAndUpdate(product._id,
                    {
                        $set: {
                            quantity: updatedQuantity,
                            totalPrice: updatedPrice
                        }
                    },
                    { new: true, runValidators: true }
                )
            }
            return res.status(200).json({
                data: newCartData,
                message: 'Data added to cart successfully.',
                success: true
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Failed to update cart with ID` });
    }
};

const deleteAddCartById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(401).json({
                message: 'Id is required!',
                success: false
            })
        }
        const deletedAnItem = await AddCartModel.findByIdAndDelete(id)
        return res.status(200).json({
            data: deletedAnItem,
            message: `Cart with ID: ${id} deleted successfully`,
            success: true
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete cart with ID: ${id}` });
    }
};

export { getAddCarts, getAddCartById, createAddCart, updateAddCartById, deleteAddCartById }; 