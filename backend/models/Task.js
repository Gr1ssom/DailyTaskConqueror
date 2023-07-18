const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    contents: {
      type: String,
      required: true
    },
    //optional!
    letterCount: {
      type: Number,
      required: true
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  }
);

const Task = model('Task', taskSchema);

module.exports = Task;