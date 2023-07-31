import { Handler } from "express";
import Order, { IOrder } from "./order.model";

export const findOrder: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) throw new Error("404::order not found");
    res.status(200).json({ code: 200, status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const queryOrder: Handler = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("products");
    res.status(200).json({ code: 200, status: "success", data: orders });
  } catch (error) {
    next(error);
  }
};

export const createOrder: Handler = async (req, res, next) => {
  try {
    const body: IOrder = req.body;
    body.status = "order";
    const order = await Order.create(body);
    res.status(201).json({ code: 201, status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrder: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body: Partial<IOrder> = req.body;
    const order = await Order.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ code: 200, status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndRemove(id);
    res.status(200).json({ code: 200, status: "success", data: order });
  } catch (error) {
    next(error);
  }
};
