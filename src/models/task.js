const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const JoiObjectId = require("joi-objectid");
validateObjectId = JoiObjectId(Joi);

const taskSchema = new mongoose.Schema({
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  _listID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "List"
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    userID: validateObjectId(),
    listID: validateObjectId(),
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    checked: Joi.boolean()
  });
  return schema.validate(task);
}

module.exports = {Task, validateTask};