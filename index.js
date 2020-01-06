const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const grapQLSchema = require('./graphql/schema');
const grapQLResolvers = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: grapQLSchema,
    rootValue: grapQLResolvers,
    graphiql: true
  })
);

const PORT = process.env.PORT || 3000;

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
