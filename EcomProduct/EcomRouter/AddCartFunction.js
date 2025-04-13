import e from "express";
import { AddCartModel } from "../AddCart_Schema.js";


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
        const actualData = await AddCartModel.findOne({ _id: cartData._id });
        if (actualData) {
            const updatedQuantity = actualData.quantity + 1;
            const updatedPrice = actualData.price * updatedQuantity;
            const updatedData = await AddCartModel.findByIdAndUpdate(actualData._id, {
                $set: {
                    quantity: updatedQuantity,
                    totalPrice: updatedPrice
                },
            },
                { new: true })
            console.log('updatedData', updatedData, updatedQuantity, updatedPrice);

            return res.status(200).json({
                data: updatedData,
                message: 'Cart updated successfully',
                success: true
            })
        }

        if (!cartData) {
            return res.status(400).json({ message: 'Cart data is required', success: false });
        }

        const newCartData = await AddCartModel.create({ ...cartData, quantity: 1, totalPrice: cartData.price * 1 });
        if (!newCartData) {
            return res.status(400).json({ message: 'Cart data is required', success: false });
        }

        return res.status(201).json({
            data: cartData,
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
            return res.status(400).json({ message: 'Cart Id is required', success: false })
        }
        const { quantity, totalPrice } = req.body;
        if (!quantity || !totalPrice) {
            return res.status(400).json({ message: 'Quantity and totalPrice are required', success: false });
        }
        const updatedData = await AddCartModel.findById(id);
        if (updatedData) {
            const updatedQuantity = updatedData.quantity + quantity;
            const updatedPrice = updatedData.totalPrice + totalPrice;
            const updateDate = await AddCartModel.findByIdAndUpdate(id, {
                $set: {
                    quantity: updatedQuantity,
                    totalPrice: updatedPrice,
                },
            }, { new: true })
            return res.status(200).json({
                data: updateDate,
                message: 'Cart updated successfully',
                success: true
            });
        } else {
            return res.status(404).json({ message: 'Cart not found', success: false });
        }


    } catch (error) {
        console.log(error);

        res.status(500).json({ error: `Failed to update cart with ID: ${id}` });
    }
};

const deleteAddCartById = async (req, res) => {
    try {
        const { id } = req.params;
        // Logic to delete a cart by ID
        res.status(200).json({ message: `Cart with ID: ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete cart with ID: ${id}` });
    }
};

export { getAddCarts, getAddCartById, createAddCart, updateAddCartById, deleteAddCartById }; 