import express from "express";
import convertRoutes from "./routes/convert.routes.js";
import conversionsRoutes from "./routes/conversions.routes.js";
import ratesRoutes from "./routes/rates.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/convert", convertRoutes);
app.use("/conversions", conversionsRoutes);
app.use("/rates", ratesRoutes);

app.use(errorMiddleware);

export default app;

