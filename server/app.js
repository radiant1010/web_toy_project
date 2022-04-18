const express = require('express')
const app = express()
const port = 3000

const { sequelize } = require('./models');
const birds = require('./routes/example');

sequelize.sync();

app.use('/birds', birds);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})