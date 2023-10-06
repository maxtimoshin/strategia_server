import express from "express";
import "dotenv/config";
import { createFunnelLead } from "./services/createFunnelLead.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post("/createOrder", async (req, res) => {
  try {
    await createFunnelLead(req.body);
    res.status(200).send("Order creation request sent successfully.");
  } catch (error) {
    res.status(500).send("Error creating order: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
