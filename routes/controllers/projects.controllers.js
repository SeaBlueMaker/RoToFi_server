const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const Project = require("../../models/Project");
const User = require("../../models/User");

const {
  NO_AUTHORITY_TO_ACCESS,
  UNEXPECTED_ERROR,
  INVALID_REQUEST,
  OK,
} = require("../../constants/messages");

const getProjectList = async (req, res, next) => {
  const email = jwt.decode(token);

  try {
    const user = await User.findOne({ email });

    res
      .status(200)
      .send({ result: OK, projects: user.projects });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  const { creatorEmail, title, description } = req.body;
  const { auth: token } = req.cookies;

  const email = jwt.decode(token);

  try {
    const inValidUser = String(email) !== String(creatorEmail);

    if (inValidUser) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const isInvalidRequest = (creatorEmail === undefined) || (title === undefined) || (description === undefined);

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    const createdProject = await Project.create({
      title,
      description,
      world: {
        title: "World of Fantasy",
        description: "Once upon a time there were four little rabbits...",
      },
    });

    const user = await User.findOne({ email });

    await User.findByIdAndUpdate(
      user._id,
      { $push: { projects: createdProject._id } },
      { new: true }
    );

    res.send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  getProjectList,
  createProject,
};
