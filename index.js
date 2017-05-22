const request = require('request-promise-native');

module.exports = async () => {
  const flat = await request(process.env.DB, { json: true });
  const array = Object.keys(flat).map(x =>
    Object.assign({}, flat[x], { id: x })
  );
  return array;
};
