require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(router);

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log('Error connecting to the database');
    console.error(e);
  }
})();
