const config = require('config');
const SimpleClient = require('sparql-http-client/SimpleClient');

const queryUrl = `${config.get('sparql.server_url')}${config.get('sparql.query_path')}`;
const ACCEPTED_TYPES = [ 'application/n-triples', 'text/turtle', 'application/n-quads' ];

module.exports.describe_query = async function (req, res, next) {
  if (req.accepts(ACCEPTED_TYPES) || !req.get('Accept')) {
    try {
      if (!req.get('Accept')) {
        // Default to application/n-triples
        req.headers.accept = ACCEPTED_TYPES[0];
      }
      const client = new SimpleClient({ endpointUrl: queryUrl });

      const resp = await client.query.construct(`DESCRIBE ${req.query.list}`, { headers: { Accept: req.get('Accept') } });
      const text = await resp.text();

      res.type(req.get('Accept'));
      res.send(text);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(406).send('Not Acceptable');
  }
};
