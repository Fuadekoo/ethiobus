const jwt = require("jsonwebtoken");
module.exports=(req,res,next)=>{
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    // validate the token
    if(!authHeader){
        return res.status(401).send({
            message:"auth failed: Authorization header not found",
            success:false
        });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.jwt_secret);
    console.log(" the decode token is"+ decoded);
    req.body.userId=decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({
        message:`auth failed: ${error.message}`,
        success:false
    });
  }
};