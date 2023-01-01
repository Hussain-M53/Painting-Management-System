const express = require("express");
const app = express();
const cors = require("cors");
const CustomerRouter = require("./Routes/CustomerRoute.js");
const ArtistRouter = require("./Routes/ArtistRoute.js");
const CategoryRouter = require("./Routes/CategoryRoute.js");
const OwnerRouter = require("./Routes/OwnerRoute.js");
const PaintingRouter = require("./Routes/PaintingRoute.js");
const PaintingsRentedRouter = require("./Routes/PaintingsRentedRoute.js");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.json("connected to oracle");
});

app.use("/Customer", CustomerRouter);
app.use("/Artist", ArtistRouter);
app.use("/Category", CategoryRouter);
app.use("/Painting", PaintingRouter);
app.use("/Owner", OwnerRouter);
app.use("/Paintings-Rented", PaintingsRentedRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
//remaining
//trigger to return paiting if not hired for 3 months
//addd return painting table to add painting when they are returned to owner
// can reatake the painting after 3 months
