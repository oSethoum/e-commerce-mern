import { Handler } from "express";
import User, { IUser } from "./user.model";
import { HTTPError } from "../../common/http-error";

export const findUser: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new HTTPError(404, "user not found");
    res.status(200).json({ code: 200, status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const queryUser: Handler = async (req, res, next) => {
  try {
    const users = await User.find({ password: 0 });
    res.status(200).json({ code: 200, status: "success", data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser: Handler = async (req, res, next) => {
  try {
    const body: IUser = req.body;
    const user = await User.create(body);
    res.status(201).json({ code: 201, status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body: Partial<IUser> = req.body;
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({ code: 200, status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: Handler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    res.status(200).json({ code: 200, status: "success", data: user });
  } catch (error) {
    next(error);
  }
};
