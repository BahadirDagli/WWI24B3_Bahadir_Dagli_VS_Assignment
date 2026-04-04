const app = require('./app');

const PORT = 8080;

console.log('server.js wurde gestartet');

app.listen(PORT, () => {
    console.log(`MS1 läuft auf http://localhost:${PORT}`);
});