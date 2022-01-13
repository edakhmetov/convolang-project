require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

const router = require('./routes/user.routes');


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost${PORT}`);
    });
  } catch (e) {
    console.log('Error connecting to the database');
    console.error(e);
  }
})();
