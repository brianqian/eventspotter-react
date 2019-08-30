require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // useFileSystemPublicRoutes: false,
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.node = {
      fs: 'empty',
    };
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
};
