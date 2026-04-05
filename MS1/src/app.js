const express = require('express');
const cors = require('cors');

require('./database/initDb');
//require('./config/mqtt');

const spielerRoutes = require('./routes/spielerRoutes');
const levelRoutes = require('./routes/levelRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('MS1 läuft');
});

app.use('/spieler', spielerRoutes);
app.use('/level', levelRoutes);

module.exports = app;