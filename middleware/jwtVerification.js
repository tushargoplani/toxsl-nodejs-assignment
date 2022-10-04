const jwt = require("jsonwebtoken");

exports.userVerification = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Authentication Failed");
  }
};
