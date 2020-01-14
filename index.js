const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const grapQLSchema = require('./graphql/schema');
const grapQLResolvers = require('./graphql/resolvers');
const isAuth = require('./middlewares/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'Post,Get,Options');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: grapQLSchema,
    rootValue: grapQLResolvers,
    graphiql: true
  })
);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-epr9d.mongodb.net/${'booking-app'}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
