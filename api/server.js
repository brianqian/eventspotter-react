const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// const corsOptions = {
//   origin: 'http//localhost:3000',
// };

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
