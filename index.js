import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const posts = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/create-post", (req, res) => {
  res.render("create.ejs");
});

app.get("/your-posts", (req, res) => {
  res.render("posts.ejs", { posts: posts });
});
app.post("/your-posts", (req, res) => {
  const data = {
    userName: req.body["fName"],
    userLastName: req.body["lName"],
    contentTitle: req.body["contentTitle"],
    contentText: req.body["contentText"],
    postCategory: req.body["category"],
  };
  posts.push(data);
  res.render("posts.ejs", { posts: posts });
});
app.post("/continue-reading", (req, res) => {
  const index = parseInt(req.body.index);
  const post = posts[index];
  res.render("continue.ejs", { index: index, post: post });
});
app.post("/delete-post", (req, res) => {
  const index = parseInt(req.body.index);
  posts.splice(index, 1);
  res.redirect("/your-posts");
});
app.post("/edit-post", (req, res) => {
  const index = parseInt(req.body.index);
  const post = posts[index];
  res.render("edit.ejs", { index: index, post: post });
});
app.post("/update-post", (req, res) => {
  const index = parseInt(req.body.index);
  posts[index] = {
    userName: req.body["fName"],
    userLastName: req.body["lName"],
    contentTitle: req.body["contentTitle"],
    contentText: req.body["contentText"],
    postCategory: req.body["category"],
  };
  res.redirect("/your-posts");
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
