const { Task } = require('../models');

const resolvers = {
  Query: {
    tasks: async () => {
      return await Task.find({});
    }
  }
};

module.exports = resolvers;