const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const axios = require('axios');

const LAUNCHES_URL = 'https://api.spacexdata.com/v4/launches';
const ROCKETS_URL = 'https://api.spacexdata.com/v4/rockets';

const MissionPatch = new GraphQLObjectType({
  name: 'MissionPatch',
  fields: () => ({
    small: { type: GraphQLString },
    large: { type: GraphQLString },
  }),
});

const Links = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    patch: { type: MissionPatch },
    article: { type: GraphQLString },
  }),
});

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) },
    missions: {
      type:new GraphQLList(LaunchType),
      resolve: (parent, args)=>axios.get(LAUNCHES_URL).then(res=>res.data.filter(item=>item.rocket===parent.id))
    }
  }),
});


const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    rocket: {
      type: RocketType,
      resolve: (parent) => axios.get(`${ROCKETS_URL}/${parent.rocket}`).then((res) => res.data),
    },
    links: { type: Links },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      args: {
        miss_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(LAUNCHES_URL)
          .then((res) => res.data.filter((item) => item.name.toLowerCase().includes(args.miss_name.toLowerCase())));
      },
    },
    launch: {
      type: LaunchType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios.get(`${LAUNCHES_URL}/${args.id}`).then((res) => res.data);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      args:{
        name:{ type: GraphQLString }
      },
      resolve(parent, args) {
        return axios.get(ROCKETS_URL).then((res) => res.data.filter(item=>item.name.toLowerCase().includes(args.name.toLowerCase())));
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios.get(`${ROCKETS_URL}/${args.id}`).then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
