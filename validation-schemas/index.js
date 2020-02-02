import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required()
});

export const RegisterSchema = Yup.object().shape({
  user_name: Yup.string()
    .typeError("user_name must be a valid string")
    .required(),
  email: Yup.string()
    .email()
    .trim()
    .required(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required(),
  account_type: Yup.number()
    .typeError("account_type must be a number")
    .positive("account_type must be greater than zero")
    .integer()
});

export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .typeError("name must be a valid string")
    .required()
});

export const createProductSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("name must be a valid string")
    .required(),
  category: Yup.string()
    .typeError("category must be a valid string")
    .trim()
    .required(),
  description: Yup.string()
    .typeError("description must be a valid string")
    .required(),
  price: Yup.number()
    .typeError("price must be a number")
    .positive("price must be greater than zero")
    .required(),
  quantity: Yup.number()
    .typeError("quantity must be a number")
    .positive("quantity must be greater than zero")
    .integer()
});

export const updateProductSchema = Yup.object().shape({
  name: Yup.string().typeError("name must be a valid string"),
  category: Yup.string()
    .typeError("category must be a valid string")
    .trim(),
  description: Yup.string().typeError("description must be a valid string"),
  price: Yup.number()
    .typeError("price must be a number")
    .positive("price must be greater than zero"),
  quantity: Yup.number()
    .typeError("quantity must be a number")
    .positive("quantity must be greater than zero")
    .integer()
});
