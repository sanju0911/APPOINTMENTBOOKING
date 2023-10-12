const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post("/insert", async (request, response) => {
  try {
    const name = request.body.name;
    const email = request.body.email;

    const db = dbService.getDbServiceInstance();

    const result = await db.insertNewName(name, email);

    response.json({ success: true });
  } catch (err) {
    console.log(err);
    response.status(500).json({ data: data, error: "An error occurred." });
  }
});
// read
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// update
app.patch("/update", (request, response) => {
  const { id, name, email } = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updateNameById(id, name, email);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// // delete
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRowById(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

app.get("/search/:name", (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log("app is running"));
