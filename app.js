const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const describe = require('./controllers/describe');
const construct = require('./controllers/construct');
const update = require('./controllers/update');

const port = config.get('port');

const app = express();
app.use(morgan('combined'));

app.get('/describe', describe.describe_type);
app.get('/describe-list', describe.describe_list);
app.get('/construct', construct.construct_query);
app.post('/update', bodyParser.text({ type: 'text/turtle' }), update.insert);

app.listen(port, () => console.log(`LANDRS SparQL service started listening on port ${port}`));
