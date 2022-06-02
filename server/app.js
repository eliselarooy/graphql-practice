const dotenv = require('dotenv');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

// Allow cross origin requests
app.use(cors());

mongoose.connect(
  `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.dyw7nlx.mongodb.net/?retryWrites=true&w=majority`
);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// Middleware handles request
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
