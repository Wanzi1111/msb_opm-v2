const { Upload } = require('@msb-next/webpack-plugins');

import settings from '../src/settings';

const getEnv = () => process.env.npm_lifecycle_event.split(':')[1]

const upload = () => {
  const upload = new Upload({
    prefix: `admin/${getEnv()}/${settings.version}/`,
    bucket: 'msb-operation-center',
    base: 'dist',
  });
  return upload.start();
};

upload()
