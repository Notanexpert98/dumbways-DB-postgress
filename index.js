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
const { Sequelize, QueryTypes } = require("sequelize");
const { title } = require("process");
const { type } = require("os");
const sequelize = new Sequelize(config.development);
const BlogModel = require("./models/blog.js");

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
  const query = `SELECT * FROM public."Blogs"`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("output_blog.hbs", { Blogs: result });
}

async function outputviews_page(req, res) {
  const { inputtitle, inputcontent } = req.body;
  const query = `INSERT INTO public."Blogs"(id,"Title","Content","Image","createdAt","updatedAt") VALUES (DEFAULT,'${inputtitle}','${inputcontent}','./image/riko.png',now(),now())`;
  const result = await sequelize.query(query, { type: QueryTypes.INSERT });
  res.redirect("/output");
}

async function delblog(req, res) {
  const { id } = req.params;
  let query = `SELECT * FROM public."Blogs" WHERE id=${id}`;

  let result = await sequelize.query(query, { type: QueryTypes.SELECT });
  if (!result.length) res.render("TIDAK MENEMUKAN APAPUN");

  query = `DELETE FROM public."Blogs" WHERE id=${id}`;
  result = await sequelize.query(query, { type: QueryTypes.DELETE });
  res.redirect("/output");
}

async function editblogview_page(req, res) {
  const { id } = req.params;
  let query = `SELECT * FROM public."Blogs" WHERE id=${id}`;

  let result = await sequelize.query(query, { type: QueryTypes.SELECT });
  if (!result.length) res.render("TIDAK MENEMUKAN APAPUN");

  res.render("Editblog.hbs", { Blogs: result[0] });
}

async function editblog_page(req, res) {
  const { id } = req.params;
  const { inputtitle, inputcontent } = req.body;
  const query = `UPDATE public."Blogs" SET "Title"='${inputtitle}', "Content"='${inputcontent}' WHERE id=${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/output");
}

async function blog_detail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Blogs" WHERE id=${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  if (!result.length) {
    res.render("TIDAK MENEMUKAN APAPUN");
  } else {
    res.render("blog_detail.hbs", { Blogs: result[0] });
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
