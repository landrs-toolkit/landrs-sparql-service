require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  sparql: {
    server_url: process.env.SPARQL_SERVER_URL || 'http://ld.landrs.org',
    query_path: process.env.SPARQL_QUERY_PATH || '/query',
    update_path: process.env.SPARQL_UPDATE_PATH || '/update',
  },
  auth: {
    username: process.env.SPARQL_USERNAME || '',
    password: process.env.SPARQL_PASSWORD || ''
  }
};
