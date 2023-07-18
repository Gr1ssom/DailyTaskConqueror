const { Class } = require('../models');
//edit when models more solid
const resolvers = {
  Query: {
    classes: async () => {
      return await Class.find({});
    }
  }
};

module.exports = resolvers;