import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required()
});

export const RegisterSchema = Yup.object().shape({
  userName: Yup.string().required(),
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string()
    .min(6)
    .max(10)
    .required(),
  accountType: Yup.number()
});

export const CategorySchema = Yup.object().shape({
  name: Yup.string().required()
});

export const createProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  category: Yup.string().required(),
  desc: Yup.string().required(),
  price: Yup.number().required(),
  quantity: Yup.number()
});

export const updateProductSchema = Yup.object().shape({
  name: Yup.string(),
  category: Yup.string(),
  desc: Yup.string(),
  price: Yup.number(),
  quantity: Yup.number()
});
