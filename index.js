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
const usermodel = require("./models").User;
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

app.use(
  session({
    secret: "4_bDB_n_GcZhg23",
    name: "session_id",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

// push data input blog ke cons array

const blogs = [];

// routing
app.get("/", home);
app.get("/blog", blog_page);

app.get("/del_blog/:id", delblog);
app.get("/output", output_page);
app.post("/output", outputviews_page);
app.get("/EditBlog/:id", editblogview_page);
app.post("/EditBlog/:id", editblog_page);
app.get("/blog_detail/:id", blog_detail);
app.get("/login", login_blog);
app.post("/login", login_page);
app.get("/username", username_page);
app.post("/username", register_page);

// function routing

function home(req, res) {
  res.render("index.hbs");
  console.log(req.session.user);
}

function blog_page(req, res) {
  res.render("blog.hbs");
}

function username_page(req, res) {
  res.render("register.hbs");
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

function login_blog(req, res) {
  res.render("login.hbs");
}

async function register_page(req, res) {
  try {
    const { name_login, email_login, phone_login, option_login, pass_login } =
      req.body;
    const bcrypt = require("bcrypt");
    const saltround = 10;
    const hash_password = await bcrypt.hash(pass_login, saltround);
    const result = await usermodel.create({
      name: name_login,
      email: email_login,
      email: email_login,
      phone: phone_login,
      option: option_login,
      password: hash_password,
    });
    req.flash("success", "Register Berhasil");
    res.redirect("/");
  } catch (error) {
    req.flash("danger", "Register Gagal");
    res.redirect("/username");
  }
}

async function login_page(req, res) {
  try {
    const { email_login, pass_login } = req.body;
    const bcrypt = require("bcrypt");
    const email_validity = await usermodel.findOne({
      where: { email: email_login },
    });
    const pass_validity = await bcrypt.compare(
      pass_login,
      email_validity.password
    );

    if (!email_validity) {
      req.flash("error_login", "Gagal Login, ada yang salah");
    } else if (!pass_validity) {
      req.flash("error_login", "Gagal Login, ada yang salah");
    } else {
      req.session.user = email_validity;
      req.flash("login_berhasil", "Sudah Masuk Guys");

      res.redirect("/");
    }
  } catch (error) {
    req.flash("error_login", "Gagal Login, ada yang salah");
    res.redirect("/login");
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
