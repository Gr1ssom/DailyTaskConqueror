module.exports = function override(config, env) {
    // Add a fallback to the resolve section of your Webpack configuration
    config.resolve.fallback = {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    };
  
    return config;
  };
  