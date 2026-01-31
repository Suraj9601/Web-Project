import express from "express";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // 🔑 load .env

const app = express();
const PORT = process.env.PORT || 8080;

// 🔹 MySQL connection (prod safe)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// 🔹 __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // future ready

// 🔹 HOME
app.get("/", (req, res) => {
  const { success, error } = req.query;

  db.query("SELECT * FROM todos ORDER BY id DESC", (err, todos) => {
    if (err) {
      console.error(err);
      return res.render("index", {
        todos: [],
        errorMsg: "Failed to load todos",
        successMsg: null,
      });
    }

    res.render("index", {
      todos,
      successMsg: success || null,
      errorMsg: error || null,
    });
  });
});

// 🔹 ADD TODO
app.post("/add", (req, res) => {
  const title = req.body.title?.trim();

  db.query(
    "SELECT id FROM todos WHERE title = ?",
    [title],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.redirect("/?error=Something went wrong");
      }

      if (rows.length > 0) {
        return res.redirect("/?error=Todo already exists");
      }

      db.query(
        "INSERT INTO todos (title) VALUES (?)",
        [title],
        err => {
          if (err) {
            console.error(err);
            return res.redirect("/?error=Failed to add todo");
          }
          res.redirect("/?success=Todo added successfully");
        }
      );
    }
  );
});

// 🔹 EDIT TODO
app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const title = req.body.title?.trim();

  if (!title) {
    return res.redirect("/?error=Title cannot be empty");
  }

  // duplicate check (excluding self)
  db.query(
    "SELECT id FROM todos WHERE title = ? AND id != ?",
    [title, id],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.redirect("/?error=Something went wrong");
      }

      if (rows.length > 0) {
        return res.redirect("/?error=Todo already exists");
      }

      db.query(
        "UPDATE todos SET title = ? WHERE id = ?",
        [title, id],
        err => {
          if (err) {
            console.error(err);
            return res.redirect("/?error=Update failed");
          }
          res.redirect("/?success=Todo updated successfully");
        }
      );
    }
  );
});

// 🔹 DELETE TODO
app.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM todos WHERE id = ?",
    [id],
    err => {
      if (err) {
        console.error(err);
        return res.redirect("/?error=Delete failed");
      }
      res.redirect("/?success=Todo deleted successfully");
    }
  );
});

// 🔹 SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
