import { object, email, string, minLength, regex } from "valibot";

export const loginBodySchema = object({
  email: string([email("invalid email")]),
  password: string([minLength(6, "password too short")]),
});

export const registerBodySchema = object({
  name: string([regex(/^(?!\\d+$)\\w+(?: \\w+)*$/, "invalid name")]),
  email: string([email("invalid email")]),
  password: string([minLength(6, "password too short")]),
});
