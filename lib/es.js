const elasticsearch = require('elasticsearch');

const es = new elasticsearch.Client({
  host: '',
});

es.search({
  index: "exchange",
  body: {
    query: { match_all: {} }
  }
})
  .then(console.log)
  .catch(console.error);