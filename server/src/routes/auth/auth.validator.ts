import { object, email, string, minLength, regex } from "valibot";

export const loginBodySchema = object({
  email: string([email("invalid email")]),
  password: string([minLength(6, "password too short")]),
});

export const registerBodySchema = object({
  name: string([regex(/^w+( w+)*$/, "invalid email")]),
  email: string([email("invalid email")]),
  password: string([minLength(6, "password too short")]),
});
