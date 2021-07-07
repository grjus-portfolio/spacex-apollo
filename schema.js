const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');


const Links = new GraphQLObjectType({
	name: "Links",
	fields: () => ({
		mission_patch: { type: GraphQLString }
	})

});




const LaunchType = new GraphQLObjectType({
	name: 'Launch',
	fields: () => ({
		flight_number: { type: GraphQLInt },
		mission_name: { type: GraphQLString },
		launch_year: { type: GraphQLString },
		launch_date_local: { type: GraphQLString },
		launch_success: { type: GraphQLBoolean },
		details: { type: GraphQLString },
		rocket: { type: RocketType },
		links: { type: Links },

	}),
});

const RocketType = new GraphQLObjectType({
	name: 'Rocket',
	fields: () => ({
		rocket_id: { type: GraphQLString },
		rocket_name: { type: GraphQLString },
		rocket_type: { type: GraphQLString },
		description: {
			type: GraphQLString,
			resolve: (parent) => {
				return axios.get(`https://api.spacexdata.com/v3/rockets/${parent.rocket_id}`)
					.then(res => res.data.description);
			}
		}

	})
});

const Rocket = new GraphQLObjectType({
	name: 'RocketSchema',
	fields: () => ({
		description: { type: GraphQLString }
	})
});


// RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		launches: {
			type: new GraphQLList(LaunchType),
			resolve(parent, args) {
				return axios.get('https://api.spacexdata.com/v3/launches')
					.then(res => res.data);
			}
		},
		launch: {
			type: LaunchType,
			args: {
				flight_number: { type: GraphQLInt }
			},
			resolve(parent, args) {
				return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
					.then(res => res.data);
			}
		},
		rockets: {
			type: new GraphQLList(RocketType),
			resolve(parent, args) {
				return axios.get('https://api.spacexdata.com/v3/rockets')
					.then(res => res.data);
			}
		},
		rocket: {
			type: RocketType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
					.then(res => res.data);
			}
		}
	}

});

module.exports = new GraphQLSchema({
	query: RootQuery
});