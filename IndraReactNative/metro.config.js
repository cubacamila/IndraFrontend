const path = require('path');
const extraNodeModules = {
  'common': path.resolve(__dirname + '../../IndraReactCommon'),
};
const watchFolders = [
  path.resolve(__dirname + '../../IndraReactCommon')
];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  }, 
  resolver: {
    extraNodeModules
  },
  watchFolders,
};