require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const router = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SESSION_SECRET || 'this is not very secure';

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('Sorry, this page doesn\'t exist');
});

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
