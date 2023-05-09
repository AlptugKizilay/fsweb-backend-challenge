const Posts = require("./posts-model");
const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");

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
const checkUserId = (req, res, next) => {
    
    const requestUserId =parseInt(req.params.user_id);
    const token = req.headers.authorization;
  
    try {        
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const loggedInUserId = decodedToken.user_id;
      if (requestUserId === loggedInUserId) {
        next();
      } else {        
        res.status(401).json({error: 'Yetkisiz işlem: Geçersiz kullanıcı kimliği'});
      }
    } catch (error) {
      res.status(401).json({ error: error });
    }
  };

module.exports = {payloadCheck,checkUserId}