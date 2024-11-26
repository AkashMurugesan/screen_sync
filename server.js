import express from "express";
import mongoose from "mongoose";
import config from "./config/index.js";
import showRoutes from "./routes/show.routes.js";
import authRoutes from "./routes/auth.routes.js"
import authenticateJWT from "./middleware/auth.middleware.js";

const app = express();
const { port, mongoURI, jwtSecret } = config;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log(`MongoDB connected to ${mongoURI}...`))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(express.json());

// TODO Need verfify once again
app.use("/api", authRoutes)
app.use("/api", authenticateJWT, showRoutes);

// TODO common error handlers

// This only for test the server is up purpose
app.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'Pong' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

// Start the server
app.listen(port, () => {
  console.log(
    `Server running on port ${port} in ${process.env.NODE_ENV || "development"} mode`
  );
});
