const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const spielerRoutes = require('./routes/spielerRoutes');
const levelRoutes = require('./routes/levelRoutes');
const spielrundeRoutes = require('./routes/spielrundeRoutes');

require('./database/initDb');
require('./config/mqtt');

const swaggerDocument = YAML.load('./src/swagger/openapi.yaml');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('MS1 läuft');
});

app.use('/spieler', spielerRoutes);
app.use('/level', levelRoutes);
app.use('/spielrunde', spielrundeRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;