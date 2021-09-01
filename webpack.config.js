const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  //config.resolve.root = [path.resolve('./src')];
 // config.resolve.root = ['./src'];
  config.resolve.extensions = [".js", ".web.js", ".android.js", ".ios.js"];
  config.resolve.alias._assets = path.resolve('./src/assets');
  config.resolve.alias._components = path.resolve('./src/components');
  config.resolve.alias._atoms = path.resolve('./src/components/atoms');
  config.resolve.alias._molecules = path.resolve('./src/components/molecules');
  config.resolve.alias._organisms = path.resolve('./src/components/organisms');
  config.resolve.alias._navigations = path.resolve('./src/navigations');
  config.resolve.alias._pages = path.resolve('./src/pages');
  config.resolve.alias._templates = path.resolve('./src/templates');
  config.resolve.alias._services = path.resolve('./src/services');
  config.resolve.alias._styles = path.resolve('./src/styles');
  config.resolve.alias._utils = path.resolve('./src/utils');

  return config;
};
