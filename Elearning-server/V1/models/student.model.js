const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const studentSchema = new Schema({
  studentId: Number,
  name: {
    first: { type: String, minlength: 3, maxlength: 20 },
    last: { type: String, minlength: 3, maxlength: 20 },
  },
  mobile: { type: String, maxlength: 15, unique: true },
  email: { type: String, maxlength: 45, required: true, unique: true },
  aboutme: { type: String, maxlength: 45, required: true, unique: true },
  address: { street: String, city: String, country: String, pincode: Number },
  school: { type: String, minlength: 3, maxlength: 20 },
  hometown: { type: String, minlength: 3, maxlength: 20 },
  language:{ type: String, minlength: 3, maxlength: 20 },

});

studentSchema.plugin(AutoIncrement, { inc_field: "studentId" });

const student = mongoose.model("student", studentSchema);

module.exports = student;
