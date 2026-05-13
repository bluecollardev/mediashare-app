// Dynamic Expo config that merges the static app.json with values
// loaded from `.env` / `.env.development` / `.env.production`. Expo
// CLI auto-loads those files into process.env before invoking this
// file, so reading process.env here is enough — no extra plumbing.
//
// Without this, `Constants.expoConfig.extra.awsUrl` was undefined and
// uri/imageSrc on uploads concatenated the literal string "undefined".
module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiServer: process.env.API_SERVER,
    awsUrl: process.env.AWS_URL,
    awsRoot: process.env.AWS_ROOT,
    videoRoot: process.env.VIDEO_ROOT,
    uploadRoot: process.env.UPLOAD_ROOT,
    thumbnailRoot: process.env.THUMBNAIL_ROOT,
    maxUpload: process.env.MAX_UPLOAD,
    testUser: process.env.TEST_USER,
    testPassword: process.env.TEST_PASSWORD,
  },
});
