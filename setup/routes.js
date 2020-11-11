import productRoute from "../routes/products";
import categoryRoute from "../routes/category";
import brandRoute from "../routes/brands";
import sizeRoute from "../routes/size";
import customerRegisterRoute from "../routes/auth/customer/register";
import customerLoginRoute from "../routes/auth/customer/login";
import adminRegisterRoute from "../routes/auth/admin/register";
import adminLoginRoute from "../routes/auth/admin/login";
import customerRoute from "../routes/customers";
import userRoute from "../routes/users";

export default function setupRoutes(app) {
  app.use("/products", productRoute);
  app.use("/categories", categoryRoute);
  app.use("/register", customerRegisterRoute);
  app.use("/login", customerLoginRoute);
  app.use("/admin/register", adminRegisterRoute);
  app.use("/admin/login", adminLoginRoute);
  app.use("/users", userRoute);
  app.use("/customers", customerRoute);
  app.use("/brands", brandRoute);
  app.use("/sizes", sizeRoute);
}
