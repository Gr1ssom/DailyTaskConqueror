const { Task } = require('../models');

const resolvers = {
  Query: {
    classes: async () => {
      return await Task.find({});
    }
  }
};

module.exports = resolvers;