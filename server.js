const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
	schema: schema,
	graphiql: true
}),
);


// In development listens to 5000, on heroku uses process.env.PORT
const PORT = process.env.PORT || 5000;

// This is local issue. Unable to get local issuer certificate
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));