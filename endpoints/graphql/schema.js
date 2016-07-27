import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'

import address from '../address/graphql-schema'
import bus from '../bus/graphql-schema'
import car from '../car/graphql_schema'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      address,
      busses: bus,
      car,
    },
  }),
})

export default schema
