const request = require('request-promise-native');
const readdir = require('recursive-readdir');

const { basename, dirname } = require('path');

const streams = DB =>
  // request the DB via http
  request(DB, { json: true }).then(flat =>
    // create array from flat-db object and the key as id
    Object.keys(flat).map(x => Object.assign({}, flat[x], { id: x }))
  );

const files = (FOLDER, SERVE) =>
  readdir(FOLDER).then(x =>
    x.map(fullpath => ({
      url: fullpath.replace(FOLDER, SERVE),
      name: basename(fullpath),
      id: basename(fullpath),
      icon:
        'http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/file-video-icon.png',
      tags: [basename(dirname(fullpath))]
    }))
  );
module.exports = async () => {
  const results = await Promise.all([
    streams(process.env.DB),
    files(process.env.FOLDER, process.env.SERVE)
  ]);
  return results.reduce((x, y) => x.concat(y), []);
};
