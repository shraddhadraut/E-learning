const express = require("express");
const StudentCtrl = require("../controllers/student.controller");
const router = express.Router();

router.post("/", StudentCtrl.createStudent);

router.put("/:id", StudentCtrl.updateStudent);

router.delete("/:id", StudentCtrl.deleteStudent);

router.get("/", StudentCtrl.getStudents);

router.get("/:id", StudentCtrl.getStudent);
module.exports = router;
