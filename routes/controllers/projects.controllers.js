const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const Project = require("../../models/Project");
const User = require("../../models/User");
const Plot = require("../../models/Plot");
const Character = require("../../models/Character");

const {
  NO_AUTHORITY_TO_ACCESS,
  UNEXPECTED_ERROR,
  INVALID_REQUEST,
  OK,
} = require("../../constants/messages");

const {
  WORLD_TITLE,
  WORLD_DESCRIPTION
} = require("../../constants/examples");

const getProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project
      .findById(id)
      .populate(["characters", "plots"]);

    res
      .status(200)
      .send({ result: OK, project });
  } catch (error) {
    next(error);
  }
};

const getProjectList = async (req, res, next) => {
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    const user = await User
      .findById(userId)
      .populate(["projects"]);

    res
      .status(200)
      .send({ result: OK, projects: user.projects });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  const { creatorId, title, description } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    const isInValidUser = String(userId) !== String(creatorId);

    if (isInValidUser) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const isInvalidRequest = (creatorId === undefined) || (title === undefined) || (description === undefined);

    if (isInvalidRequest) {
      throw createError(422, INVALID_REQUEST);
    }

    const createdProject = await Project.create({
      title,
      description,
      world: {
        title: WORLD_TITLE,
        description: WORLD_DESCRIPTION,
      },
      plots: [],
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { projects: createdProject._id } },
      { new: true }
    );

    const initialChapterCard = await Plot.create({
      isTimeFlag: true,
      situation: "기승전결이나 시간을 표기하는 챕터 카드입니다. 이 카드를 클릭한 후 에디터에서 편집해보세요!",
      location: {
        title: "장소명",
        imageURL: "",
        description: "장소에 대한 설명을 정리하는 공간입니다.",
      },
    });

    const initialPlotCard = await Plot.create({
      isTimeFlag: false,
      situation: "한 챕터 내에서 전개되는 플롯을 표기하는 플롯 카드입니다. 이 카드를 클릭한 후 에디터에서 편집해보세요!",
      location: {
        title: "장소명",
        imageURL: "",
        description: "장소에 대한 설명을 정리하는 공간입니다.",
      },
    });

    await Project.findByIdAndUpdate(
      createdProject._id,
      { $push: { plots: initialChapterCard } },
      { new: true }
    );

    await Project.findByIdAndUpdate(
      createdProject._id,
      { $push: { plots: initialPlotCard } },
      { new: true }
    );

    const initialCharacter = await Character.create({
      name: "박무열",
      role: "화이트 크리스마스의 주인공.",
      sex: "남",
      age: "19세",
      appearance: "튀는 곳 없이 반듯한 외모",
      personality: "수신고 최고의 모범생으로 '메뉴얼 맨'이라 불리는 바른생활 소년. 수신고의 학부모들에게 '사위 삼고 싶은 남학생' 설문조사를 했을 때 당당하게 1위를 차지했을 정도. 편지를 보낸 인물을 추적해나가는데 있어 가장 적극적으로 행동하는 인물. 또한 학생들 간의 이견다툼에 개입하여 상황을 수습하는 일을 도맡아하고 있다.",
      etc: "기타사항",
      imageURL: "",
    });

    await Project.findByIdAndUpdate(
      createdProject._id,
      { $push: { characters: initialCharacter } },
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

const deleteProject = async (req, res, next) => {
  const { projectId } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    const project = await Project.findByIdAndDelete(projectId, { new: true });

    if (project === null) {
      throw createError(404, NOT_FOUND);
    }

    await User.findByIdAndUpdate(
      userId,
      { $pull: { projects: projectId } },
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
  getProject,
  getProjectList,
  createProject,
  deleteProject,
};
