const express = require("express");
const router = express.Router();
const api = require("../../api");
const { createAccessToken, createRefreshToken } = require("../helpers/helpers");
const { ensureCorrectUser, authRequired } = require("../../middleware/auth");

router.get("/", authRequired, async function (req, res, next) {
  try {
    const users = await api.getUsers();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

router.get("/:username", authRequired, async function (req, res, next) {
  try {
    const user = await api.getUser(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const newUser = await api.registerUser(req.body);
    const token = createAccessToken(newUser);
    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const user = await api.authenticateUser(req.body);
    const token = createAccessToken(user);
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ message: "User deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
