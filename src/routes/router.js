const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/uploadPicture");
const { authenticated: auth, checkAuth } = require("../middleware/auth");

const {
  register,
  login,
  detail: detailUser,
  edit: editUser,
} = require("../controller/user");

const {
  getAll: getAllLiterature,
  index: viewLiteratures,
  create: createLiterature,
  search: searchLiteratures,
  view: getLiterature,
  edit: editLiterature,
  delete: deleteLiterature,
} = require("../controller/literature");

const {
  index: userCollection,
  create: createCollection,
  delete: deleteCollection,
  check: searchOneCollection,
} = require("../controller/collection");

router.get("/auth", auth, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", auth, detailUser);
router.patch("/user/:id", auth, upload("picture"), editUser);

router.get("/literatures-verification", auth, getAllLiterature);
router.get("/literatures/:userId", auth, viewLiteratures);
router.get(
  "/literature-search/:title&:publicationDate",
  auth,
  searchLiteratures
);
router.get("/literature/:id", auth, getLiterature);
router.post("/literature", auth, createLiterature);
router.post("/literature-update/:id", auth, editLiterature);
router.delete("/literature/:id", auth, deleteLiterature);

router.get("/collections/:id", auth, userCollection);
router.get("/collection-id/:userId&:literatureId", auth, searchOneCollection);
router.post("/collection", auth, createCollection);
router.delete("/collection/:id", auth, deleteCollection);

module.exports = router;
