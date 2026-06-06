import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!process.env.MONGO_DB_URL) {
  throw new Error("MONGO_DB_URL is not defined in environment variables");
}
if (!process.env.JWT_ACCESS_SECRET_KEY) {
  throw new Error("JWT_ACCESS_SECRET_KEY is not defined in environment variables");
}
if (!process.env.JWT_REFRESH_SECRET_KEY) {
  throw new Error("JWT_REFRESH_SECRET_KEY is not defined in environment variables");
}
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined in environment variables");
}
const config = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};

export default config;
