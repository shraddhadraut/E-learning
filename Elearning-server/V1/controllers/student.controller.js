const Student = require("../models/student.model");

class StudentCtrl {
  static createStudent(req, res) {
    const u = req.body;

    const StudentObj = new Student(u);

    StudentObj
      .save()
      .then((result) => {
        res.status(200).send({ message: "Student created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created a Student", error: err });
      });
  }
  // end of createStudent

  // updateStudent
  static updateStudent(req, res) {
    const { id } = req.params;
    const u = req.body;

    Student.findByIdAndUpdate(id, u, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not updated the Student", error: err });
      else
        res.status(200).send({
          message: "Student updated successsfully",
          data: result,
        });
    });
  }
  // end of updateStudent

  // deleteStudent
  static deleteStudent(req, res) {
    const { id } = req.params;

    Student.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true },
      (err, result) => {
        if (err)
          res
            .status(404)
            .send({ message: "Could not deleted the Student", error: err });
        else
          res.status(200).send({
            message: "Student deleted successsfully",
            data: result,
          });
      }
    );
  }
  // end of deleteStudent

  // getStudent
  static getStudent(req, res) {
    const { id } = req.params;

    Student.findOne({
      _id: id,
     
    })
      .select("name mobile email address StudentId age status  createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "Student ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the Student", error: err });
      });
  }
  // end of getStudent

  // getStudents
  static getStudents(req, res) {
    Student.find({
    })
      .select("name mobile email StudentId age status address createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "Student List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the Students", error: err });
      });
  }
  // end of getStudents
}

module.exports = StudentCtrl;
