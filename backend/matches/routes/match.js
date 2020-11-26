const express = require("express");
const router = express.Router();
const api = require("../../api");
const { authRequired } = require("../../middleware/auth");

router.get("/:id(\\d+)/", async function (req, res, next) {
  try {
    const match = await api.getMatch(req.params.id);
    return res.json({ match });
  } catch (e) {
    return next(e);
  }
});

router.get("/:username", authRequired, async function (req, res, next) {
  try {
    const matches = await api.getUserMatches(req.params.username);
    return res.json({ matches });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
