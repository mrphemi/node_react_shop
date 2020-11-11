// import * as Yup from "yup";
import { string, number, array, object } from "yup";

// Auth
export const LoginSchema = object().shape({
  email: string()
    .typeError("email must be a valid string")
    .trim()
    .email("email must be a valid email")
    .required("email is required"),
  password: string()
    .min(6, "min of 6 characters for password")
    .max(50, "max of 50 characters for password")
    .required("password is required"),
});

export const RegisterSchema = object().shape({
  first_name: string()
    .typeError("first_name must be a valid string")
    .trim()
    .required("first_name is required"),
  last_name: string()
    .typeError("last_name must be a valid string")
    .trim()
    .required("last_name is required"),
  email: string()
    .typeError("email must be a valid string")
    .email("email must be a valid email")
    .trim()
    .required("email is required"),
  password: string()
    .typeError("password must be a valid string")
    .min(6, "min of 6 characters for password")
    .max(50, "max of 50 characters for password")
    .required("password is required"),
});

// User
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const updateUserSchema = object().shape({
  first_name: string().typeError("user_name must be a valid string").trim(),
  last_name: string().typeError("user_name must be a valid string").trim(),
  email: string()
    .typeError("email must be a valid string")
    .email("email must be a valid email")
    .trim(),
  phone: string().matches(phoneRegExp, "Phone number is not valid"),
  address: object({
    country: string().typeError("country must be a valid string").trim(),
    city: string().typeError("city must be a valid string").trim(),
    street_address: string()
      .typeError("street address must be a valid string")
      .trim(),
    postal_code: string()
      .typeError("postal code must be a valid string")
      .trim(),
  }),
});

// Category
export const CategorySchema = object().shape({
  name: string().typeError("name must be a valid string").required(),
});

// Brand
export const BrandSchema = object().shape({
  name: string().typeError("name must be a valid string").required(),
});

// Size
export const SizeSchema = object().shape({
  size: number()
    .typeError("size must be a number")
    .positive("size must be greater than zero")
    .required(),
});

// Product
export const createProductSchema = object().shape({
  name: string().typeError("name must be a valid string").required(),
  category: string()
    .typeError("category must be a valid string")
    .trim()
    .required(),
  description: string()
    .typeError("description must be a valid string")
    .required(),
  price: number()
    .typeError("price must be a number")
    .positive("price must be greater than zero")
    .required(),
  availableSizes: array()
    .of(
      object()
        .shape({
          size: string().typeError("Please enter a valid size").trim(),
          quantity: number()
            .typeError("quantity must be a number")
            .positive("quantity must be greater than zero")
            .integer(),
        })
        .required(),
    )
    .typeError("please select at least one size")
    .min(1, "At least one size must be selected")
    .required(),
  brand: string().typeError("A brand must be specified").trim().required(),
  image: string()
    .typeError("image must be a valid string")
    .trim()
    .url("image must be a valid url"),
  image_id: string().typeError("image must be a valid string").trim(),
});

export const updateProductSchema = object().shape({
  name: string().typeError("name must be a valid string").trim(),
  category: string().typeError("category must be a valid string").trim(),
  description: string().typeError("description must be a valid string").trim(),
  price: number()
    .typeError("price must be a number")
    .positive("price must be greater than zero"),
  availableSizes: array()
    .of(
      object()
        .shape({
          size: string().typeError("Please enter a valid size").trim(),
          quantity: number()
            .typeError("quantity must be a number")
            .positive("quantity must be greater than zero")
            .integer(),
        })
        .required(),
    )
    .typeError("please select at least one size")
    .min(1, "At least one size must be selected"),
  brand: string().typeError("brand must be valid string").trim(),
  image: string()
    .typeError("image must be a valid string")
    .trim()
    .url("image must be a valid url"),
  image_id: string().typeError("image must be a valid string").trim(),
});
