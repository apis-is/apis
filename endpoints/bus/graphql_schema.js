import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql'

import getBusRoutes from './realtime'

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

export default {
  type: busRoutesType,
  args: {
    busses: { type: GraphQLString },
  },
  resolve: (_, args) => {
    return getBusRoutes(args).then((data) => data.results, (error) => error)
  },
}
