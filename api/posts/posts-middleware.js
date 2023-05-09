const Posts = require("./posts-model");

const payloadCheck = function (req, res, next) {
    
    try {
        const content =req.body.content;        
        if (!content || content.trim() === '') {
            res.status(400).json({ message: "İçerik gereklidir"});
        }else if(content.length > 140){
            res.status(400).json({ message: "140 karakterden büyük olamaz"});
          } else {
            next();
          }        
    } catch (error) {
        next(error);
    }
    
}

module.exports = {payloadCheck}