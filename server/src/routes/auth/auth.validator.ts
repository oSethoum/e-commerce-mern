import { object, email, string, minLength, regex } from "valibot";

export const loginBodySchema = object({
  email: string([email("invalid email")]),
  password: string([
    regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "must have uppercase lowercase and number"
    ),
    minLength(5, "minimum length is 5"),
  ]),
});

export const registerBodySchema = object({
  name: string([regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "invalid name")]),
  email: string([email("invalid email")]),
  password: string([
    regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "must have uppercase lowercase and number"
    ),
    minLength(5, "minimum length is 5"),
  ]),
});
