const Faculty = require("../models/faculty.model");

class FacultyCtrl {
  static createFaculty(req, res) {
    const u = req.body;

    const FacultyObj = new Faculty(u);

    FacultyObj
      .save()
      .then((result) => {
        res.status(200).send({ message: "Faculty created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created a Faculty", error: err });
      });
  }
  // end of createFaculty

  // updateFaculty
  static updateFaculty(req, res) {
    const { id } = req.params;
    const u = req.body;

    Faculty.findByIdAndUpdate(id, u, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not updated the Faculty", error: err });
      else
        res.status(200).send({
          message: "Faculty updated successsfully",
          data: result,
        });
    });
  }
  // end of updateFaculty

  // deleteFaculty
  static deleteFaculty(req, res) {
    const { id } = req.params;

    Faculty.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true },
      (err, result) => {
        if (err)
          res
            .status(404)
            .send({ message: "Could not deleted the Faculty", error: err });
        else
          res.status(200).send({
            message: "Faculty deleted successsfully",
            data: result,
          });
      }
    );
  }
  // end of deleteFaculty

  // getFaculty
  static getFaculty(req, res) {
    const { id } = req.params;

    Faculty.findOne({
      _id: id,
     
    })
      .select("name mobile email address FacultyId age status  createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "Faculty ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the Faculty", error: err });
      });
  }
  // end of getFaculty

  // getFaculties
  static getFacultys(req, res) {
    Faculty.find({
      
    })
      .select("name mobile email FacultyId age status address createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "Faculty List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the Faculties", error: err });
      });
  }
  // end of getFaculties
}

module.exports = FacultyCtrl;
