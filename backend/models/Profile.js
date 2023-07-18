const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    //optional!
    taskCount: {
      type: Number
    },
    taskList: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }
    ]
  }
);

const Profile = model('Profile', profileSchema);

module.exports = Profile;