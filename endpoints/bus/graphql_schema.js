const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql')

const getBusRoutes = require('./realtime')

const busInfoType = new GraphQLObjectType({
  name: 'BusInfo',
  fields: {
    unixTime: { type: GraphQLString },
    x: { type: GraphQLString },
    y: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
  },
})

const busRouteType = new GraphQLObjectType({
  name: 'BusRoutes',
  fields: {
    busNr: { type: GraphQLString },
    busses: { type: new GraphQLList(busInfoType) },
  },
})

const busRoutesType = new GraphQLList(busRouteType)

module.exports = {
  type: busRoutesType,
  args: {
    busses: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const data = await getBusRoutes(args)
    return data.results
  },
}
