const { User, Literature, Collection } = require("../../models");

exports.index = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const collection = await Collection.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "fullName"],
        },
        {
          model: Literature,
          as: "literature",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Success",
      data: {
        collection,
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
    const collection = await Collection.create(req.body);
    res.send({
      message: "Success add Literature to Your Collection",
      data: {
        collection,
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

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Collection.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `Success Delete Literature With id ${id} From Your Collection`,
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
