const router = require("express").Router();
const {payloadCheck, checkUserId} = require("./posts-middleware")
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
router.post("/add/:user_id",mw.restricted, checkUserId, payloadCheck,  async (req, res, next) => {
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
  router.delete('/del/:post_id', async (req, res, next) => {
      let deleted = await Posts.getPostById(req.params.post_id);
      try {
        if (deleted) {
          await Posts.remove(req.params.post_id);
          res.json({ message: 'Post silindi' });
        } else {
          next({ status: 404, message: 'Böyle bir post yok' });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  module.exports = router;