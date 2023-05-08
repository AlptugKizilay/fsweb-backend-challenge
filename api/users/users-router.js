const router = require("express").Router();
const Users = require("./users-model.js");

router.get("/", (req, res, next) => { 
    Users.findUsers()
      .then(users => {
        res.json(users);
      })
      .catch(next);
  });

  router.get("/:user_id", (req, res, next) => { 
    Users.findUserById(req.params.user_id)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });
  module.exports = router;