const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

dotenv.config();

app.use(cors ({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(process.env.PORT || 3001, () => console.log('Listening on port 3001....'))
