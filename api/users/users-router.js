const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const UsersModel = require("./users-model");
const PostsModel = require("../posts/posts-model");

// const { logger, validateUserId, validateUser, validatePost } = require("./middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  UsersModel.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in retrieving the users from the database" });
    });
});

router.get("/:id", (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  UsersModel.getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in retrieving the user from the database" });
    });
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = req.body;
  UsersModel.insert(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in creating the user in the database" });
    });
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const changedUser = req.body;
  UsersModel.update(id, changedUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in updating the user in the database" });
    });
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  let deletedUser;
  UsersModel.getById(id)
    .then((user) => {
      deletedUser = user;
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in retrieving the user from the database" });
    });
  UsersModel.remove(id)
    .then((count) => {
      if (count === 1) {
        res.status(200).json(deletedUser);
      } else {
        res.status(404).json({ message: "The user with the specified id could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in deleting the user from the database" });
    });
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  UsersModel.getUserPosts(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in retrieving the user's posts from the database" });
    });
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const newPost = {
    text: req.body.text,
    user_id: id,
  };
  PostsModel.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in creating a new post for this user" });
    });
});

module.exports = router;

// do not forget to export the router
