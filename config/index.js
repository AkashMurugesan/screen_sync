import dotenv from "dotenv";

// Load environment variables from the correct .env file
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "dev"}`,
});

let config;

switch (process.env.NODE_ENV) {
  case "prod":
    config = await import("./prod.js");
    break;
  case "test":
    config = await import("./test.js");
    break;
  default:
    config = await import("./dev.js");
}

export default config.default;
