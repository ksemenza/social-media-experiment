const express = require("express");
const reactionModel = require("../models/reaction-model");
const router = express.Router();
const restricted = require("../user/auth-middleware.js");

// POST
router.post("/", restricted, (req, res) => {
  const postData = req.body;
  reactionModel
    .addPost(postData)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: "Error Posts were not added" });
    });
});

router.get("/", restricted, (req, res) => {
  reactionModel
    .getPostsAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: `Error user id post was not found` });
    });
});

// GET STRAIN ID
router.get("/:id", restricted, (req, res) => {
  const id = req.params.id;

  reactionModel
    .getPost(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: `Error Post id ${id} were not found` });
    });
});

router.get("/:id/details", restricted, (req, res) => {
  const id = req.params.id;
  reactionModel
    .getPostDetails(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: `Error User's post id ${id} not found` });
    });
});

// DELETE USER BY ID
router.delete("/:id", restricted, (req, res) => {
  const id = req.params.id;
  reactionModel
    .removePost(id)
    .then((response) => {
      res.status(200).json({ message: `Removed user with id ${id}` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const updatedReaction = req.body;
  reactionModel
    .update(id, updatedReaction)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: `Error Post ${id} was not updated` });
    });
});

module.exports = router;
