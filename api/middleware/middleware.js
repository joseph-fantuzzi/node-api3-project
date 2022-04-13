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

// function validateUser(req, res, next) {}

// function validatePost(req, res, next) {}

module.exports = {
  logger,
  validateUserId,
};

// do not forget to expose these functions to other modules
