const express = require('express')
const app = express()
const port = 3000
const birds = require('./routes/example');
const { sequelize } = require('./models');

require("dotenv").config();
//sequelize 동기화
sequelize.sync();
//### express-session 설정 ###
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA
};

const sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'Fur_SEAL',
  resave: false,
  store: sessionStore,
  cookie: { maxAge : 600000 },
  saveUninitialized: false
}))
//### express-session 설정 end ###

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/birds', birds);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})