const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Hotel = require("./model/hotel");
const hotelControllers = require("./controller/hotel")
const MONGODB_URI = 'mongodb://localhost:27017/hotel';
const port = 3000;

app.get('/', (req, res)=> {
    res.json('Welcome')
})

app.get("/api/save-data", hotelControllers.saveData);

app.get("/api/fetch-data", hotelControllers.fetchData);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`server started at ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


