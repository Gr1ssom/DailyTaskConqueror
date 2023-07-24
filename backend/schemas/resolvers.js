const { Task } = require('../models/Task');
const { Profile } = require('../models/Profile');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (err) {
        console.error('Error fetching tasks:', err);
        return [];
      }
    },
    task: async (_, { _id }) => {
      try {
        const task = await Task.findById(_id);
        return task;
      } catch (err) {
        console.error('Error fetching task by ID:', err);
        return null;
      }
    },
  },

  Mutation: {
    createTask: async (_, { title, description, dueDate, completed }) => {
      try {
        const task = await Task.create({ title, description, dueDate, completed });
        return task;
      } catch (err) {
        console.error('Error creating task:', err);
        return null;
      }
    },
    updateTask: async (_, { _id, title, description, dueDate, completed }) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          _id,
          { title, description, dueDate, completed },
          { new: true }
        );
        return updatedTask;
      } catch (err) {
        console.error('Error updating task:', err);
        return null;
      }
    },
    deleteTask: async (_, { _id }) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(_id);
        return deletedTask;
      } catch (err) {
        console.error('Error deleting task:', err);
        return null;
      }
    },

    login: async (_, { email, password }) => {
      try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
          throw new Error('No profile found with this email address');
        }

        const isValidPassword = await profile.isCorrectPassword(password);
        if (!isValidPassword) {
          throw new Error('Incorrect password');
        }

        const token = signToken(profile);
        return { token, profile };
      } catch (err) {
        console.error('Error logging in:', err);
        return null;
      }
    },

    addProfile: async (_, { name, email, password }) => {
      try {
        const profile = await Profile.create({ name, email, password });
        const token = signToken(profile);
        return { token, profile };
      } catch (err) {
        console.error('Detailed Error Information:', err); // Enhanced error logging
        throw new Error('Error creating profile. Please check server logs for more details.'); // Descriptive error message
      }
    }
  },
};

module.exports = resolvers;
