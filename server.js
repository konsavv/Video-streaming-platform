const express = require('express');
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer"); //Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files
const { getVideoDurationInSeconds } = require("get-video-duration");
const fs = require("fs");

// SET STORAGE
let storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    callback(null, "Videos/")
  },
  filename: function (_req, file, callback) {
    callback(null, file.originalname);
    // callback(null, file.fieldname + '-' + Date.now());
  },
});

const uploads = multer({ storage: storage });
const db = require("./database.js");

const app = express();
const port = 3000;

const getVideoDuration = function (file, callback) {
  getVideoDurationInSeconds("Videos/" + file).then((duration) => {
    db.addToDb(file, duration);
    callback();
  })
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/uploadVideo", uploads.single("videofile"), function (_req, _res) {
  getVideoDuration(_req.file.originalname, () => {
    _res.json({ status: 1 });
  })
})

app.listen(port, () => {
  console.log("Server has started..");
})