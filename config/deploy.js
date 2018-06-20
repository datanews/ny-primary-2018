/* eslint-env node */

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: 'production'
    },

    gzip: {
      filePattern: '**/*.{js,css,ico,map,xml,txt,svg,eot,ttf,woff,woff2}'
    },

    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
      prefix: process.env.AWS_PREFIX,
      filePattern: function(context, pluginHelper) {
        let filePattern = pluginHelper.readConfigDefault('filePattern');
        return filePattern.replace('}', ',json}');
      },
    },
    's3-index': {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION,
      prefix: process.env.AWS_PREFIX,
    }
  };

  if (deployTarget === 'production') {
    // remove JS sourcemaps from production
    // ENV.s3.filePattern = '**/*.{js,css,png,gif,ico,jpg,xml,txt,svg,swf,eot,ttf,woff,woff2}';
  }

  return ENV;
};
