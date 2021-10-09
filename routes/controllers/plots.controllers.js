const Project = require("../../models/Project");
const Plot = require("../../models/Plot");

const {
  UNEXPECTED_ERROR,
  INVALID_REQUEST,
  OK,
} = require("../../constants/messages");

const createPlot = async (req, res, next) => {
  const { projectId, isTimeFlag, situation, location } = req.body;

  try {
    const isInvalidRequest = (projectId === undefined) || (isTimeFlag === undefined) || (situation === undefined) || (location === undefined);;

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    const createdPlot = await Plot.create({
      isTimeFlag: isTimeFlag,
      situation: situation,
      location: location,
    });

    await Project.findByIdAndUpdate(
      projectId,
      { $push: { plots: createdPlot } },
      { new: true }
    );

    res.send({ result: OK, createdPlot });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const updatePlotOrder = async (req, res, next) => {
  const { projectId, changedList } = req.body;

  try {
    const isInvalidRequest = projectId === undefined || changedList === undefined;

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    await Project.findByIdAndUpdate(
      projectId,
      { $set: { plots: changedList } }
    );

    res
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const createDialogue = async (req, res, next) => {
  const { plotId, character, script } = req.body;

  try {
    const isInvalidRequest = plotId === undefined || character === undefined || script === undefined;

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    const updatedPlot = await Plot.findByIdAndUpdate(
      plotId,
      { $push: { dialogues: { character, script } } },
      { new: true }
    );

    res
      .status(200)
      .send({ result: OK, updatedPlot });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  createPlot,
  updatePlotOrder,
  createDialogue,
};
