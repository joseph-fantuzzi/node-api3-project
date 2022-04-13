const UsersModel = require("../users/users-model");

function logger(req, res, next) {
  req.timestamp = new Date().toISOString();
  console.log(`${req.timestamp} ${req.method} to ${req.url}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  UsersModel.getById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "user not found" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error in retrieving the user from the database" });
    });
}

function validateUser(req, res, next) {
  if (!req.body.name || typeof req.body.name !== "string" || req.body.name.trim() === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.name = { name: req.body.name.trim() };
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text || typeof req.body.text !== "string" || req.body.text.trim() === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.post = { text: req.body.text.trim(), user_id: req.user.id };
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

// do not forget to expose these functions to other modules
