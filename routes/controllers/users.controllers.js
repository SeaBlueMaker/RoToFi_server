const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const { decode } = require("../../services/usersService");

const { SECRET_KEY } = require("../../config/envConfig");

const {
  UNEXPECTED_ERROR,
  OK,
} = require("../../constants/messages");

const verifyUserData = async (req, res, next) => {
  const { authorization } = req.headers;
  const idToken = authorization.split(" ")[1];

  try {
    const email = await decode(idToken);

    const user = await User.findOne({ email });

    const userId = user?._id;

    if (userId) {
      const token = jwt.sign(String(userId), SECRET_KEY);

      res.cookie("auth", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
    }

    res
      .status(200)
      .send({ result: OK, userId });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const registerUser = async (req, res, next) => {
  const { idToken } = req.body;

  try {
    const isInvalidRequest = (idToken === undefined);

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    const email = await decode(idToken);

    const user = await User.create({
      email,
    });

    const token = jwt.sign({ _id: user._id }, SECRET_KEY);

    res
      .cookie("auth", token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      })
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const logout = (req, res, next) => {
  res
    .cookie("auth", "")
    .status(200)
    .send({ result: OK });
};

module.exports = {
  verifyUserData,
  registerUser,
  logout,
};
