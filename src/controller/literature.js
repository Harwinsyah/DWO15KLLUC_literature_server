const { Literature, User } = require("../../models");
const { Op } = require("sequelize");

exports.admin = async (req, res) => {
  try {
    const literatures = await Literature.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        literatures,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.index = async (req, res) => {
  try {
    const { userId } = req.params;
    const literatures = await Literature.findAll({
      where: {
        [Op.and]: [{ userId }, { status: "Approved" }],
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        literatures,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.search = async (req, res) => {
  try {
    const { title } = req.params;
    const status = "Approved";
    const literatures = await Literature.findAll({
      where: {
        [Op.and]: [{ status }, { title: { [Op.substring]: title } }],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        literatures,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.view = async (req, res) => {
  try {
    const { id } = req.params;
    const literature = await Literature.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        literature,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.create = async (req, res) => {
  try {
    const literature = await Literature.create(req.body);
    const newLiterature = await Literature.findOne({
      where: {
        id: literature.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        newLiterature,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    await Literature.update(req.body, { where: { id } });
    const literature = await Literature.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
      ],
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Response Success",
      data: {
        literature,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server Error",
      },
    });
  }
};
