import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import connectDB from "./db.js";
import rutasRegistro from "./routes/registro.js";

dotenv.config();
const app = express();
app.use(morgan("tiny"));
app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [process.env.FRONTURI];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.status(403).json({ message: "Forbidden: Invalid origin" });
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
const addOriginHeader = (req, res, next) => {
  req.headers.origin = req.headers.origin;
  next();
};
app.use(addOriginHeader);

app.get("/", (req, res) => {
  res.send("pruebatecnica 1.0");
});

app.use("/api/v1/registro", rutasRegistro);
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    app.listen(port, () => {
      console.log(`Server connected in the port ${port} 🐶`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
