import userRouter from "./routes/userRoute.js";
import User from "./models/User.js"
import postRouter from "./routes/postRoute"
import express from "express"
import { Database } from "./database/database";
import cors from "cors"

require('dotenv').config()


const app = express()

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: ["http://localhost:5173"],
  })
);
app.use("/api/", userRouter)
app.use("/api/", postRouter)



const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await Database(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();