const express = require("express");
const router = express.Router();

const { authenticated: auth, checkAuth } = require("../middleware/auth");

const {
  register,
  login,
  detail: detailUser,
  edit: editUser,
} = require("../controller/user");

const {
  admin: adminLiterature,
  index: viewLiteratures,
  create: createLiterature,
  search: searchLiteratures,
  view: getLiterature,
  edit: editLiterature,
} = require("../controller/literature");

const {
  index: userCollection,
  create: createCollection,
  delete: deleteCollection,
} = require("../controller/collection");

router.get("/auth", auth, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", auth, detailUser);
router.post("/user/:id", auth, editUser);

router.get("/literatures-verification", auth, adminLiterature);
router.get("/literatures/:userId", auth, viewLiteratures);
router.get("/literature-search/:title", auth, searchLiteratures);
router.get("/literature/:id", auth, getLiterature);
router.post("/literature", auth, createLiterature);
router.post("/literature-update/:id", auth, editLiterature);

router.get("/collections/:id", auth, userCollection);
router.post("/collection", auth, createCollection);
router.delete("/collection/:id", auth, deleteCollection);

module.exports = router;
