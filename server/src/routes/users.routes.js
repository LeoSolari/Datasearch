const { Router } = require("express");
const {
  getUsers,
  deleteUsers,
  postUsers,
  getUser,
} = require("../controllers/users.controllers");

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", postUsers);

router.delete("/users/:id", deleteUsers);

module.exports = router;
