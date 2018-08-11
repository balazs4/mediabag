const request = require('request-promise-native');
const { basename, dirname } = require('path');

const streams = DB =>
  // request the DB via http
  request(DB, { json: true }).then(flat =>
    // create array from flat-db object and the key as id
    Object.keys(flat).map(x => Object.assign({}, flat[x], { id: x }))
  );

const files = SERVE =>
  request(SERVE, { json: true }).then(files =>
    files.map(file => ({
      url: `${SERVE}${file}`,
      name: basename(file),
      id: basename(file),
      tags: [basename(dirname(file))],
      icon:
        'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/file-video-icon.png'
    }))
  );
module.exports = async () => {
  const results = await Promise.all([
    streams(process.env.DB)
//    ,files(process.env.SERVE)
  ]);
  return results.reduce((x, y) => x.concat(y), []);
};
