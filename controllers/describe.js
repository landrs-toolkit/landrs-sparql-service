const config = require('config');
const SimpleClient = require('sparql-http-client/SimpleClient');
const SparqlClient = require('sparql-http-client');
const rdf = require('rdf-ext');

const queryUrl = `${config.get('sparql.server_url')}${config.get('sparql.query_path')}`;

module.exports.describe_type = async function (req, res, next) {
  try {
    const client = new SimpleClient({ endpointUrl: queryUrl });

    const resp = await client.query.construct(`DESCRIBE ${req.query.type}`, { headers: { Accept: 'text/turtle' } });
    const ttl = await resp.text();
    res.type('text/turtle');
    res.send(ttl);
  } catch (err) {
    next(err);
  }
};

module.exports.describe_list = async function (req, res, next) {
  try {
    const client = new SparqlClient({ endpointUrl: queryUrl });

    const stream = await client.query.construct(`DESCRIBE ${req.query.list}`);
    const dataset = rdf.dataset();
    await dataset.import(stream);
    res.json(dataset.toArray());
  } catch (err) {
    next(err);
  }
};
