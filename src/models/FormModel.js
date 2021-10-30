const mongoose = require("mongoose");
const validator = require("validator");

const FormSchema = new mongoose.Schema({
  firstName: String,
  lastName: {
    type: String,
    required: [true, "Last name is mandatory field"],
    minlength: [3, "Please enter valid last name"],
  },
  email: {
    type: String,
    required: [true, "Email-id is mandatory field"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email-id");
      }
    },
  },
  phone: {
    type: String,
    minlength: [10, "Phone number should be of length 10"],
    maxlength: [10, "Phone number should be of length 10"],
    required: [true, "Phone is mandatory field"],
  },
  message: {
    type: String,
    required: [true, "Message can't be empty"],
    minlength: [5, "Length of message should be minimum 5 characters"],
  },
});

const FormModel = new mongoose.model("form_collection", FormSchema);
module.exports = FormModel;
