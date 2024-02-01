const router = require("express").Router();
require("dotenv").config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.post("/", async (req, res) => {
  try {
  //  console.log(req.body);
    const response = await fetch(req.body.url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });
    if (!response) {
      res.status(404).json("Failed to fetch Deeazer Api");
      return;
    }
   //console.log(response);
    const ApiData = await response.json();  
   // console.log(ApiData);
    res.status(200).json(ApiData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
