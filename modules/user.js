const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserModule {
  registerUser = async (req, res) => {
    try {
      const checkEmailExist = await UserModel.findOne({
        email: req.body.email,
      });
      if (checkEmailExist)
        return res
          .status(400)
          .send({ message: "Email is already exist", code: 400 });

      const files = req.files;

      if (!files.length)
        return res
          .status(400)
          .send({ message: "Please upload images", code: 400 });

      const imageFile = files.map((files) => files.path);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await new UserModel({
        ...req.body,
        password: hashedPassword,
        images: imageFile,
      })
        .save()
        .then((user) => {
          res.json({ response: user, message: "User added successfully" });
        });
    } catch (err) {
      res.status(400).send(err);
    }
  };

  loginUser = async (req, res) => {
    const userResponse = await UserModel.findOne({ email: req.body.email });
    if (!userResponse)
      return res.status(400).send({ message: "User not found", code: 400 });

    const password = await bcrypt.compare(
      req.body.password,
      userResponse.password
    );
    if (!password)
      res.status(400).send({ message: "Incorrect password", code: 400 });

    const token = jwt.sign(
      { _id: userResponse._id, email: userResponse.email, password: userResponse.password },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      userResponse,
      message: "Login successfully",
      token,
      code: 200,
    });
  };

  getUserByToken = async (req, res) => {
    res
      .status(200)
      .json({ userResponse: await UserModel.findOne(req.user), code: 200 });
  };
}

module.exports = new UserModule();
