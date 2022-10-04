const { model, Schema } = require("mongoose");
const userSchema = Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    images: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
