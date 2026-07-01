const express = require('express');
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer"); //Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files
const { getVideoDurationInSeconds } = require("get-video-duration");
const fs = require("fs");
const { execFile } = require("child_process");

// ffmpeg-static bundles an ffmpeg binary for every platform, so no system
// install is needed. Loaded safely: if it is missing, the server still runs
// and thumbnail generation is simply skipped.
let ffmpegPath = null;
try {
  ffmpegPath = require("ffmpeg-static");
} catch (e) {
  console.log("ffmpeg-static not installed - thumbnail generation is disabled. Run `npm install ffmpeg-static` to enable it.");
}

// Make sure the folders we write to exist
fs.mkdirSync("Videos", { recursive: true });
fs.mkdirSync("thumbnails", { recursive: true });

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

// Grab a single frame ~1s into the video and save it as a .jpg thumbnail
const makeThumbnail = function (filename, callback) {
  if (!ffmpegPath) return callback();
  const input = path.join("Videos", filename);
  const output = path.join("thumbnails", filename + ".jpg");
  execFile(
    ffmpegPath,
    ["-y", "-ss", "00:00:01", "-i", input, "-frames:v", "1", "-vf", "scale=640:-1", output],
    () => callback() // best effort: continue even if it fails
  );
}

app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static("assets"));
app.use('/videos', express.static("Videos"));
app.use('/thumbnails', express.static("thumbnails"));
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/uploadVideo", uploads.single("videofile"), function (_req, _res) {
  const name = _req.file.originalname;
  getVideoDuration(name, () => {
    makeThumbnail(name, () => {
      _res.json({ status: 1 });
    });
  })
})

app.get("/filelist", function (_req, res) {
  let filelist = db.getAllFiles();
  res.json({ filelist: filelist });
})
app.get("/favfilelist", function (_req, res) {
  let newfavlist = db.getFavFiles();
  res.json({ filelist: newfavlist });
})
app.get("/binfilelist", function (_req, res) {
  let newbinlist = db.getDelFiles();
  res.json({ filelist: newbinlist });
})

// --- Actions -------------------------------------------------------------

// Toggle favorite on/off
app.post("/favorite/:id", function (req, res) {
  const value = db.toggleFav(req.params.id);
  res.json({ status: value === null ? 0 : 1, is_fav: value });
})

// Move a video to the trash (soft delete)
app.post("/trash/:id", function (req, res) {
  const changes = db.moveToTrash(req.params.id);
  res.json({ status: changes ? 1 : 0 });
})

// Restore a video from the trash
app.post("/restore/:id", function (req, res) {
  const changes = db.restore(req.params.id);
  res.json({ status: changes ? 1 : 0 });
})

// Permanently delete a video (row + video file + thumbnail)
app.delete("/permanent/:id", function (req, res) {
  const row = db.getById(req.params.id);
  const changes = db.deletePermanent(req.params.id);
  if (row) {
    fs.unlink(path.join("Videos", row.filename), () => { /* best effort */ });
    fs.unlink(path.join("thumbnails", row.filename + ".jpg"), () => { /* best effort */ });
  }
  res.json({ status: changes ? 1 : 0 });
})

app.listen(port, () => {
  console.log("Server has started..");
})
