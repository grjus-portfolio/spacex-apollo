const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const path = require('path');
const schema = require('./schema');

const app = express();

// Allow cross-origin

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// In development listens to 5000, on heroku uses process.env.PORT
const PORT = process.env.PORT || 5000;

// This is local issue. Unable to get local issuer certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
