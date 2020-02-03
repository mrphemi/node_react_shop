import * as Yup from "yup";

// Auth
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .typeError("email must be a valid string")
    .trim()
    .email("email must be a valid email")
    .required("email is required"),
  password: Yup.string()
    .min(6, "password must be minimum of 6 xters")
    .max(10, "password must not be more than 10 xters")
    .required("password is required")
});

export const RegisterSchema = Yup.object().shape({
  user_name: Yup.string()
    .typeError("user_name must be a valid string")
    .trim()
    .required("user_name is required"),
  email: Yup.string()
    .typeError("email must be a valid string")
    .email("email must be a valid email")
    .trim()
    .required("email is required"),
  password: Yup.string()
    .typeError("password must be a valid string")
    .min(6, "password must be minimum of 6 xters")
    .max(10, "password must not be more than 10 xters")
    .required("password is required"),
  account_type: Yup.number()
    .typeError("account_type must be a number")
    .positive("account_type must be greater than zero")
    .lessThan(2, "account_type must be less than 2")
    .integer()
});

// User
export const updateUserSchema = Yup.object().shape({
  first_name: Yup.string()
    .typeError("user_name must be a valid string")
    .trim(),
  last_name: Yup.string()
    .typeError("user_name must be a valid string")
    .trim(),
  user_name: Yup.string()
    .typeError("user_name must be a valid string")
    .trim(),
  email: Yup.string()
    .typeError("email must be a valid string")
    .email("email must be a valid email")
    .trim()
});

// Category
export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .typeError("name must be a valid string")
    .required()
});

// Product
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
    .integer(),
  image: Yup.string()
    .typeError("image must be a valid string")
    .trim()
    .url("image must be a valid url"),
  image_id: Yup.string()
    .typeError("image must be a valid string")
    .trim()
});

export const updateProductSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("name must be a valid string")
    .trim(),
  category: Yup.string()
    .typeError("category must be a valid string")
    .trim(),
  description: Yup.string()
    .typeError("description must be a valid string")
    .trim(),
  price: Yup.number()
    .typeError("price must be a number")
    .positive("price must be greater than zero"),
  quantity: Yup.number()
    .typeError("quantity must be a number")
    .positive("quantity must be greater than zero")
    .integer(),
  image: Yup.string()
    .typeError("image must be a valid string")
    .trim()
    .url("image must be a valid url"),
  image_id: Yup.string()
    .typeError("image must be a valid string")
    .trim()
});
