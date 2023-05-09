const router = require("express").Router();
const Comments = require("./comments-model");
const {payloadCheck} = require("./comments-middleware")
const mw = require("../auth/auth-middleware");

router.post("/:post_id/:user_id", mw.restricted, payloadCheck,  async (req, res, next) => {
    try {
    const userId =  req.params.user_id;
    const postId =  req.params.post_id;

      const model = {
        comment: req.body.comment,
        user_id: userId,  
        post_id: postId    
      };
      const insertedRecord = await Comments.insertComment(model);
      res.status(201).json(insertedRecord);
    } catch (error) {
      next(error);
    }
  });
  module.exports = router;