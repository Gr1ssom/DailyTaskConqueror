const { Task } = require('../models/Task');
const { Profile } = require('../models/Profile');  // Assuming you have a Profile model for user data.
const { signToken } = require('../utils/auth');  // Assuming you have a signToken utility.

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
    task: async (_, { id }) => {
      try {
        const task = await Task.findById(id);
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
    updateTask: async (_, { id, title, description, dueDate, completed }) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          id,
          { title, description, dueDate, completed },
          { new: true }
        );
        return updatedTask;
      } catch (err) {
        console.error('Error updating task:', err);
        return null;
      }
    },
    deleteTask: async (_, { id }) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
      } catch (err) {
        console.error('Error deleting task:', err);
        return null;
      }
    },

    // User Login
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

    // User Registration
    addProfile: async (_, { name, email, password }) => {
      try {
        const profile = await Profile.create({ name, email, password });
        const token = signToken(profile);

        return { token, profile };

      } catch (err) {
        console.error('Error creating profile:', err);
        return null;
      }
    }
  },
};

module.exports = resolvers;
