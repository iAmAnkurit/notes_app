const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  const username = req.params.username;
  res.end(`${username}'s profile`);
});

app.get("/about/:username/:age", (req, res) => {
  const username = req.params.username;
  const age = req.params.age;

  res.end(`Welcome ${username} with age ${age}`);
});

app.listen(3000, () => {
  console.log("App running on localhost:3000");
});
