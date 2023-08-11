import {
  boolean,
  email,
  minLength,
  object,
  optional,
  regex,
  string,
} from "valibot";

export const changePasswordBodySchema = object({
  password: string([regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/), minLength(5)]),
  newPassword: string([
    regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
    minLength(5),
  ]),
  newPasswordConfirm: string([
    regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
    minLength(5),
  ]),
});

export const updateInformationBodySchema = object({
  name: optional(string([minLength(6)])),
  email: optional(string([email()])),
  isAdmin: optional(boolean()),
  address: optional(string()),
});
