const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql');

const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		flight_number: { type: GraphQLInt },
		mission_name: { type: GraphQLString },
		launch_year: { type: GraphQLString },
		launch_date_local: { type: GraphQLString },
		launch_sucess: { type: GraphQLBoolean },
		rocker: { type: RocketType },
	})
});

const RocketTypes = new GraphQLObjectType({
	name: 'Rocket',
	fields: () => ({
		rocket_id: { type: GraphQLString },
		rocket_name: { type: GraphQLString },
		rocket_type: { type: GraphQLString },
	})
});


// RootQuery
const RootQuery = new Gr;