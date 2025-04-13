import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    description: { type: String },
    features: { type: [String] },
    images: { type: [String] },
    colors: { type: [String] },
    rating: { type: Number },
    reviews: { type: Number },
    stock: { type: Number, required: true },
    featured: { type: Boolean }
});

const ProductModel = mongoose.model('Product', ProductSchema);
export { ProductModel }
