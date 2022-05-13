module.exports = function withPrefixedName(config, prefix) {
  // Modify the config
  config.name = prefix + "-" + config.name;
  // Return the results
  return config;
};
