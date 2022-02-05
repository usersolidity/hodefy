import { Request, Response } from "express";
import { User } from "../models/user.js";
import { ObjectId } from "mongodb";

export const saveUser = async (req: Request, res: Response) => {
  const ownerAddress = req.body.ownerAddress;
  const email = req.body.email;
  const address = req.body.address;

  const newUser = new User(ownerAddress, email, address);
  const savedUser = await newUser.save();
  console.log('saved user ',savedUser)
  return res.status(201).json({ userId: savedUser.insertedId });
};

export const fetchUserById = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.userId);

  const user = await User.findById(userId);
  return res.status(200).json(user);
};