const express = require("express");
const bodyParser = require("body-parser");
require("./db");
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use("/api/v1/faculty", require("./V1/routes/faculty.route"));
app.use("/api/v1/student", require("./V1/routes/student.route"));

app.listen(port, () => {
  console.log("Server started at ", port);
});
