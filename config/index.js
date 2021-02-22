import "dotenv/config";

export default {
  url: process.env.APP_URL || "http://localhost:3001",
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/shop",
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};
