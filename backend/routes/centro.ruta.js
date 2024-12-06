const express = require("express");
const {
  GetAllCenters,
  GetCenterByID,
  CreateACenter,
  CreateCenters,
  LoginCenter,
  ReadCurrentCenter,
  LogoutCenter,
  LogoutAllCenters,
  UpdateCenter,
  DeleteAllCenters,
} = require("../controllers/centro.controlador");
const authMiddleware = require("../middleware/authMiddleware");

const router = new express.Router();

router.get("/api/centros", GetAllCenters);

router.post("/api/centros/login", LoginCenter);

router.get("/api/centros/me", authMiddleware, ReadCurrentCenter);

router.get("/api/centros/:id", GetCenterByID);

router.post("/api/centros/logout", authMiddleware, LogoutCenter);

router.post("/api/centros/logoutAll", authMiddleware, LogoutAllCenters);

router.post("/api/centros", CreateACenter);

router.post("/api/centros/many", CreateCenters);

router.patch("/api/centros/:id", UpdateCenter);

router.delete("/api/centros", DeleteAllCenters);

module.exports = router;
