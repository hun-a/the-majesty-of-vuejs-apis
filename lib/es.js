const elasticsearch = require('elasticsearch');

const es = new elasticsearch.Client({
  host: '',
});

const search = (index, body) => new Promise((resolve, reject) =>
  es.search({ index, body })
    .then(resolve)
    .catch(reject));

const index = (index, type, body) => new Promise((resolve, reject) => {
  const { id } = body;
  es.index({ index, type, id, refresh: true, body })
    .then(resolve)
    .catch(reject);
});

module.exports = {
  search, index
};