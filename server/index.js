import express from "express";
import cors from "cors";
import ip from "ip";
import "dotenv/config";
import { errorHandling } from "./middlewares/error.middleware.js";
import { dbConnection } from "./config/dbConnection.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

app.use(express.json());

await dbConnection();

app.use(cors({ origin: true, credentials: true }));

// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
app.use("/api/appointments", appointmentRoutes);

app.use(errorHandling);

app.get("/", (req, res) => {
  res.status(201).json("Running");
});

const port = 1001;
app.listen(port, () => {
  console.log(`App listening on the port ${ip.address()}:${port}`);
});
