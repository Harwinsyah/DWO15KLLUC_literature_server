const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const jwtKey = "l1t3124tur3TA5k";

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAd", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: {
        message: "Invalid Token",
      },
    });
  }
};

exports.authenticated = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      error: {
        message: "Access Denied",
      },
    });
  }

  try {
    const verified = jwt.verify(token, jwtKey);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: {
        message: "Invalid Token",
      },
    });
  }
};
