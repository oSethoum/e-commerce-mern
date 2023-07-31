import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  products: Array<{ type: Types.ObjectId; ref: "Product" }>;
  details: Array<{ price: number; quantity: number }>;
  status: "deliver" | "cancelled" | "order";
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema: Schema<IOrder> = new mongoose.Schema<IOrder>({
  status: { type: String, default: "order" },
  products: [{ type: Types.ObjectId, ref: "Product" }],
  details: [{ price: Number, quantity: Number }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
