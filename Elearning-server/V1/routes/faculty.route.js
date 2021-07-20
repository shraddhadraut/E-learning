const express = require("express");
const FacultyCtrl = require("../controllers/faculty.controller");
const router = express.Router();

router.post("/", FacultyCtrl.createfaculty);

router.put("/:id", FacultyCtrl.updatefaculty);

router.delete("/:id", FacultyCtrl.deletefaculty);

router.get("/", FacultyCtrl.getfaculty);

router.get("/:id", FacultyCtrl.getfaculty);

module.exports = router;
