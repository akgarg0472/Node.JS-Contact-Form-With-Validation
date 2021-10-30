const express = require("express");
const router = express.Router();
const FormModel = require("../models/FormModel");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/form-submit", (req, res) => {
  const data = new FormModel(req.body);

  data
    .save()
    .then(() => {
      res.status(201).send({
        status: 201,
        message: `Thank you for contacting us, we will reach back to you ASAP`,
      });
    })
    .catch((err) => {
      err.message = err.message.substring(err.message.indexOf(":") + 1);
      let errorMessage = "Your input has following errors: \n\n";
      const errors = err.message.split(",");

      errors.map((val) => {
        errorMessage += `- ${val.substring(val.lastIndexOf(":") + 1).trim()}\n`;
      });

      res.status(400).send({
        status: 400,
        message: `${errorMessage.substring(0, errorMessage.length - 1)}`,
      });
    });
});

router.get("*", (req, res) => {
  res.status(404).send({
    status: 404,
    message: "Requested resource not found on the server",
  });
});

module.exports = router;
