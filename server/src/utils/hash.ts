import { hash, compare } from "bcrypt";

export const hashString = async (data: string) => {
  return hash(data, 7);
};

export const compareHash = async (data: string, hashData: string) => {
  return compare(data, hashData);
};
