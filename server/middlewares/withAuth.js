const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');

dotenv.config();
const secret = process.env.SECRET || 'SOME_SECRET';

const auth = {
  verifyToken(req, res, next) {
    const token = req.cookies.auth_id;
    if (!token) 
      return res.status(403).send('Token not provided');
    
    jwt.verify(token, secret, async (err, decoded) => {
      if (err)
        return res.clearCookie('auth_id').status(403).send('Invalid authorization token');
      
      try {
        const user = await userController.getUserByUsername(decoded.username);
        if (!user) 
          return res.clearCookie('auth_id').statusCode(400).json({"message": "This user does not exist" })
        req.user = user;
        return next();  
      } catch (error) {
        return res.clearCookie('auth_id').status(404).send(error)
      }
    })
  },
}

module.exports = auth;