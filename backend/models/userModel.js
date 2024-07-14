const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isGroupChat: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

userModel.methods.matchPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userModel);

module.exports = User;
