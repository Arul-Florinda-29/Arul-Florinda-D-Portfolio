const express = require("express");
const Achievement = require("../models/Achievement");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(await Achievement.find().sort({ createdAt: -1 }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    res.status(201).json(await Achievement.create(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ message: "Achievement not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Achievement.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Achievement not found" });
    res.json({ message: "Achievement deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
