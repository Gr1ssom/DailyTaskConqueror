const { Schema, model } = require('mongoose');

const tasksSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    //optional!
    tasksCount: {
      type: Number,
      required: true
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  }
);

const Tasks = model('Tasks', tasksSchema);

module.exports = Tasks;