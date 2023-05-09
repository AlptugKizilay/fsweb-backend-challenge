const router = require("express").Router();
const {payloadCheck} = require("./posts-middleware")
const Posts = require("./posts-model");
const mw = require("../auth/auth-middleware");

router.get("/", mw.restricted, (req, res, next) => { 
    Posts.getPosts()
      .then(posts => {
        res.json(posts);
      })
      .catch(next);
  });

router.get("/:post_id",mw.restricted, (req, res, next) => { 
    Posts.getPostById(req.params.post_id)
      .then(posts => {
        res.json(posts);
      })
      .catch(next);
  });
router.post("/add/:user_id",mw.restricted, payloadCheck,  async (req, res, next) => {
    try {
    const userId =  req.params.user_id;
    
      const model = {
        content: req.body.content,
        user_id: userId       
      };
      const insertedRecord = await Posts.insertPost(model);
      res.status(201).json(insertedRecord);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;