import user from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    if (!req.body.fullname) {
      throw { code: 428, message: "Fullname is required" };
    }
    if (!req.body.email) {
      throw { code: 428, message: "Email is required" };
    }
    if (!req.body.password) {
      throw { code: 428, message: "Password is required" };
    }

    // check if password match
    if (req.body.password !== req.body.retype_password) {
      throw { code: 428, message: "PASSWORD_MUST_MATCH" };
    }

    // check if email exist
    const email = await user.findOne({ email: req.body.email });
    if (email) {
      throw { code: 409, message: "EMAIL_EXIST" };
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });

    const User = await newUser.save();

    if (!User) {
      throw { code: 500, message: "USER_REGISTER_FAILED" };
    }

    return res.status(200).json({
      status: true,
      message: "USER_REGISTER_SUCCESS",
      User,
    });
  } catch (error) {
    if (!error.code) {
      error.code = 500;
    }
    return res.status(error.code).json({
      status: false,
      message: error.message,
    });
  }
};

export { register };
