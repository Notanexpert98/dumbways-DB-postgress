const express = require("express");
const extended = require("it/lib/extended");
const app = express();
const port = 3000;
const path = require("path");
app.set("view engine", "hbs");
app.use("/image", express.static(path.join(__dirname, "image")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.urlencoded({ extended: true }));
const config = require("./config/config.json");
const { Sequelize, QueryTypes, where } = require("sequelize");
const { title } = require("process");
const { type } = require("os");
const sequelize = new Sequelize(config.development);
const blogmodel = require("./models").Blogs;

// push data input blog ke cons array

const blogs = [];

// routing
app.get("/", home);
app.get("/blog", blog_page);
app.get("/username", username_page);
app.get("/del_blog/:id", delblog);
app.get("/output", output_page);
app.post("/output", outputviews_page);
app.get("/EditBlog/:id", editblogview_page);
app.post("/EditBlog/:id", editblog_page);
app.get("/blog_detail/:id", blog_detail);

// function routing

function home(req, res) {
  res.render("index.hbs");
}

function blog_page(req, res) {
  res.render("blog.hbs");
}

function username_page(req, res) {
  res.render("web.hbs");
}

async function output_page(req, res) {
  const result = await blogmodel.findAll();

  res.render("output_blog.hbs", { Blogs: result });
}

async function outputviews_page(req, res) {
  const { inputtitle, inputcontent } = req.body;
  const result = await blogmodel.create({
    Title: inputtitle,
    Content: inputcontent,
    Image: "./image/riko.png",
  });

  res.redirect("/output");
}

async function delblog(req, res) {
  const { id } = req.params;
  let result = await blogmodel.findOne({ where: { id: id } });
  if (!result) res.render("TIDAK MENEMUKAN APAPUN");
  result = await blogmodel.destroy({ where: { id: id } });
  res.redirect("/output");
}

async function editblogview_page(req, res) {
  const { id } = req.params;
  let result = await blogmodel.findOne({ where: { id: id } });
  if (!result) res.render("TIDAK MENEMUKAN APAPUN");
  res.render("Editblog.hbs", { Blogs: result });
}

async function editblog_page(req, res) {
  const { id } = req.params;
  const { inputtitle, inputcontent } = req.body;
  const result = await blogmodel.update(
    { Title: inputtitle, Content: inputcontent },
    { where: { id: id } }
  );

  res.redirect("/output");
}

async function blog_detail(req, res) {
  const { id } = req.params;
  const result = await blogmodel.findOne({ where: { id: id } });
  if (!result) {
    res.render("TIDAK MENEMUKAN APAPUN");
  } else {
    res.render("blog_detail.hbs", { Blogs: result });
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
