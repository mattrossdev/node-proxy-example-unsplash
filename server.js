const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));

app.post("/image-search", async (req, res) => {
  try {
    const unsplashURL = "https://api.unsplash.com/search/photos";

    const queryParams = {
      ...req.query,
      client_id: process.env.UNSPLASH_API_KEY,
    };
    console.log(queryParams);

    const response = await axios.get(unsplashURL, { params: queryParams });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error", error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(PORT, () => {
  console.log("Server Started");
});
