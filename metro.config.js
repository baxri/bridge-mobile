const path = require('path')

const linkedModules = {}
const linkedModulesFolders = []

if (process.env.INTROPATH_CORE_DEV_PATH) {
  linkedModules['intropath-core'] = process.env.INTROPATH_CORE_DEV_PATH
  linkedModulesFolders.push(process.env.INTROPATH_CORE_DEV_PATH)
}

module.exports = {
  projectRoot: path.resolve(__dirname, '.'),

  watchFolders: [
    path.resolve(__dirname, 'node_modules'),
    ...linkedModulesFolders
  ],

  resolver: {
    // https://github.com/facebook/metro/issues/1#issuecomment-453450709
    extraNodeModules: new Proxy(
      {
        ...linkedModules
      },
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
      }
    )
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
}
