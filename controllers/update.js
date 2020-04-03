const config = require('config');
const SparqlClient = require('sparql-http-client');

const updateUrl = `${config.get('sparql.server_url')}${config.get('sparql.update_path')}`;
const authUsername = config.get('auth.username');
const authPassword = config.get('auth.password');

module.exports.insert = async function (req, res, next) {
  try {
    const query = `
        BASE <http://ld.landrs.org/>
        PREFIX schema: <http://schema.org/>
        PREFIX sosa: <http://www.w3.org/ns/sosa/>
        PREFIX landrs: <http://schema.landrs.org/schema/>
        INSERT DATA {
          ${req.body}
        }`;

    const client = new SparqlClient({ updateUrl: updateUrl, user: authUsername, password: authPassword });
    await client.query.update(query, { headers: { authorization: `Basic ${Buffer.from(`${authUsername}:${authPassword}`).toString('base64')}` }});
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};
