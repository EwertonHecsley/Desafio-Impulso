const app = require('./index');
require('dotenv').config();

app.listen(process.env.PORT_SERVER, () => console.log('Servidor Online'))