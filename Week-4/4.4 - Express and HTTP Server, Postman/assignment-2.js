//Assignment #2 - You need to create an express HTTP server in Node.js which will handle the logic of a file server.
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const filesDir = path.join(__dirname, "./files/");

app.get("/files", (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve Files" });
    }
    res.json(files);
  });
});
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(filesDir, filename);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    res.send(data);
  });
});

app.listen(3000);
