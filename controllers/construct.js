const config = require('config');
const SparqlClient = require('sparql-http-client');
const rdf = require('rdf-ext');

const queryUrl = `${config.get('sparql.server_url')}${config.get('sparql.query_path')}`;

module.exports.construct_query = async function (req, res, next) {
  try {
    const client = new SparqlClient({ endpointUrl: queryUrl });

    const stream = await client.query.construct(`
                    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                    CONSTRUCT {
                      ?sub ${req.query.target} ?target
                    } WHERE {
                      ?sub rdf:type ${req.query.type} .
                      ?sub ${req.query.target} ?target
                    }
                  `);

    const dataset = rdf.dataset();
    await dataset.import(stream);
    res.json(dataset.toArray());
  } catch (err) {
    next(err);
  }
};
