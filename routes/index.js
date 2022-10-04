const ValidationManager = require("../middleware/validation");
const UserModule = require("../modules/user");
const {upload} = require("../middleware/multer");
const { userVerification } = require("../middleware/jwtVerification");

const route = (app) => {
    app.post("/register-user", upload.array('images'), ValidationManager.validateRegistration, UserModule.registerUser);
    app.post("/login-user", ValidationManager.validateLogin, UserModule.loginUser);
    app.get("/verify-user", userVerification, UserModule.getUserByToken)
}

module.exports = route;