import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql'

import getBusRoutes from './realtime'

const busInfoType = new GraphQLObjectType({
  name: 'busInfo',
  description: 'Real-time location of busses. Results are only shown for active busses.',
  fields: {
    unixTime: { type: GraphQLString },
    x: { type: GraphQLString },
    y: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
  },
})

const busRouteType = new GraphQLObjectType({
  name: 'busRoutes',
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
