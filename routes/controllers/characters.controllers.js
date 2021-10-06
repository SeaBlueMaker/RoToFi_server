const Character = require("../../models/Character");
const Project = require("../../models/Project");

const {
  UNEXPECTED_ERROR,
  INVALID_REQUEST,
  OK,
} = require("../../constants/messages");

const createCharacter = async (req, res, next) => {
  const { projectId, character } = req.body;
  const {
    name,
    role,
    sex,
    age,
    appearance,
    personality,
    etc,
    imageURL,
  } = character;

  try {
    const isInvalidRequest = (projectId === undefined) || (character === undefined);

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    const createdCharacter = await Character.create({
      name,
      role,
      sex,
      age,
      appearance,
      personality,
      etc,
      imageURL,
    });

    await Project.findByIdAndUpdate(
      projectId,
      { $push: { characters: createdCharacter } },
      { new: true }
    );

    res.send({ result: OK, createdCharacter });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  createCharacter,
};
