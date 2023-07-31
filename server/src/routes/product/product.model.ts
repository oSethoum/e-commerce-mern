import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema: Schema<IProduct> = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
