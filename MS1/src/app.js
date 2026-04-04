const express = require('express');
const cors = require('cors');
require('./database/initDb');
const spielerRoutes = require('./routes/spielerRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('MS1 läuft');
});

app.use('/spieler', spielerRoutes);

module.exports = app;