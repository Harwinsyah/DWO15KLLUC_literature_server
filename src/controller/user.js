const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtKey = "l1t3124tur3TA5k";

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      gender,
      phone,
      address,
      picture,
    } = req.body;
    console.log(req.body);
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already exist!",
        },
      });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: encryptPassword,
      fullName,
      gender,
      phone,
      address,
      picture,
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    res.send({
      message: "Register Success!",
      data: {
        email: user.email,
        token,
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: "Yout Email or Password wrong. Please try again",
        },
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        error: {
          message: "Your Email or Password wrong. Please try again",
        },
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    res.send({
      message: "Login Success",
      data: {
        email: user.email,
        token,
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

exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error",
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    await User.update(
      {
        picture: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const data = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "role", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "Response Success! Data has been Updated",
      data,
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
