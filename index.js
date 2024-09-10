const express = require("express");
const cors = require("cors");
const app = express();

let posts = [
  { id: 1, title: "Post 1", body: "This is the first post", likes: 0 },
  { id: 2, title: "Post 2", body: "This is the second post", likes: 0 },
  { id: 3, title: "Post 3", body: "This is the third post", likes: 0 },
  { id: 4, title: "Post 4", body: "This is the first post", likes: 5 },
  { id: 5, title: "Post 5", body: "This is the second post", likes: 7 },
  { id: 6, title: "Post 6", body: "This is the third post", likes: 7 },
];
let todo = [{ id: 1, title: "od some word" }];
// Middleware to cors requests
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json("HELLO ADITYA RATHORE");
});

app.get("/search", (req, res) => {
  const currentPage = parseInt(req.query.currentpage);
  const number = currentPage;
  if (isNaN(currentPage) || currentPage < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = startIndex + itemsPerPage - 1;
  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(`item-${i}`);
  }
  console.log("items: ", items);
  res.json(items);
});

app.get("/post", (req, res) => {
  // console.log(posts);
  res.json(posts);
});

app.post("/post/:id/like", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  post.likes += 1;
  res.json({ message: "Like added", post });
});
app.get("/todoitems", (req, res) => {
  res.json(todo);
});
app.post("/addtodo", (req, res) => {
  console.log("in addtodo");
  const todoTitle = req.body.title;
  console.log("todoTitle: ", todoTitle);
  const newTodo = { id: todo.length + 1, title: todoTitle };
  todo.push(newTodo);
  res.json(todo);
});

app.listen(8080, () => {
  console.log("port running at 8080");
});
