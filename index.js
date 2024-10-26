const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  const fileName = req.params.filename;

  fs.readFile(`./files/${fileName}`, "utf-8", (err, fileData) => {
    res.render("show", { fileName: fileName, fileData: fileData });
  });
});

app.get("/edit/:filename", (req, res) => {
  const fileName = req.params.filename;
  res.render("edit", { fileName: fileName });
});

app.post("/edit", (req, res) => {
  const prevName = req.body.previous;
  const newName = req.body.new;

  fs.rename(`./files/${prevName}`, `./files/${newName}`, (err) => {
    res.redirect("/");
  });
});

app.post("/create", (req, res) => {
  const fileName = req.body.title.split(" ").join("");
  const details = req.body.details;
  fs.writeFile(`./files/${fileName}.txt`, details, (err) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("App running on localhost:3000");
});
