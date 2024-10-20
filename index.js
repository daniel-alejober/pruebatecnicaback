import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import connectDB from "./db.js";
import rutasRegistro from "./routes/registro.js";

dotenv.config();
const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("pruebatecnica 1.0");
});

app.use("/api/v1/registro", rutasRegistro);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    app.listen(process.env.PORT, () => {
      console.log(`Server connected in the port ${process.env.PORT} 🐶`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
