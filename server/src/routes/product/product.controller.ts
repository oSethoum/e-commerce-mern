import { Handler } from "express";
import Product, { IProduct } from "./product.model";

export const findProduct: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) throw new Error("404::product not found");
    res.status(200).json({ code: 200, status: "success", data: product });
  } catch (error) {
    next(error);
  }
};

export const queryProduct: Handler = async (req, res, next) => {
  try {
    const products = await Product.find().populate("products");
    res.status(200).json({ code: 200, status: "success", data: products });
  } catch (error) {
    next(error);
  }
};

export const createProduct: Handler = async (req, res, next) => {
  try {
    const body: IProduct = req.body;
    const product = await Product.create(body);
    res.status(201).json({ code: 201, status: "success", data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body: Partial<IProduct> = req.body;
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ code: 200, status: "success", data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndRemove(id);
    res.status(200).json({ code: 200, status: "success", data: product });
  } catch (error) {
    next(error);
  }
};
